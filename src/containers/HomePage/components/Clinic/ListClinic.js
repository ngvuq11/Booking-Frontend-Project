import { Breadcrumb, Pagination, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ClinicCard from '../../../../components/ClinicCard';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import * as actions from '../../../../store/actions';
import Footer from '../Section/Footer';
import './ListClinic.scss';
import Search from './SearchClinic';

const { Text } = Typography;
const pageSize = 8;
class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
      keyword: '',
      isLoading: false,
      current: 1,
    };
  }

  componentDidMount() {
    this.props.fetchAllClinic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allClinics !== this.props.allClinics) {
      this.setState({
        listClinic: this.props.allClinics,
        isLoading: true,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }

  handleViewDetailClinic = (clinicId) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinicId.id}`);
    }
  };

  handleSearchClinic = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };
  handleChangePageNumber = (page) => {
    console.log(page);
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  render() {
    // let { language } = this.props;
    let { listClinic, keyword, isLoading } = this.state;

    // eslint-disable-next-line array-callback-return
    listClinic = listClinic.filter((clinic) => {
      if (keyword === '') {
        return listClinic;
      } else if (
        clinic.name.toLowerCase().includes(keyword.toLowerCase()) ||
        clinic.address.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return listClinic;
      }
    });

    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader isShowBanner={false} />
            <Section className='clinic'>
              <Container>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Text
                      onClick={() => this.props.history.push(`/home`)}
                      style={{ cursor: 'pointer' }}
                    >
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>Danh sách các cơ sở y tế</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Search
                  className='search'
                  keyword={keyword}
                  handleSearchClinic={this.handleSearchClinic}
                />
                <div className='list__clinic--all'>
                  {listClinic.map(
                    (item, index) =>
                      index >= this.state.minIndex &&
                      index < this.state.maxIndex && (
                        <ClinicCard
                          key={index}
                          image={item.image}
                          onClick={() => this.handleViewDetailClinic(item)}
                          name={item.name}
                          address={item.address}
                        />
                      )
                  )}
                </div>
                <Pagination
                  current={this.state.current}
                  onChange={this.handleChangePageNumber}
                  pageSize={pageSize}
                  total={listClinic.length}
                  style={{ marginTop: '30px', textAlign: 'end' }}
                />
              </Container>
            </Section>
            <Footer />
          </>
        ) : (
          <Spin
            tip='Plese wait...'
            size='large'
            style={{
              width: '100vw',
              height: '100vh',
              maxHeight: 'unset',
              display: 'flex',
              gap: '20px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allClinics: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListClinic)
);
