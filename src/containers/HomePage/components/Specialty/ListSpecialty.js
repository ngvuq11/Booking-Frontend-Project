import { Breadcrumb, Pagination, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import SpecialtyCard from '../../../../components/SpecialtyCard/index';
import * as actions from '../../../../store/actions';
import Footer from '../Section/Footer/index';
import './ListSpecialty.scss';
import Search from './SearchSpecialty';

const { Text } = Typography;
const pageSize = 4;
class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
      keyword: '',
      isLoading: false,
      current: 1,
    };
  }
  componentDidMount() {
    this.props.fetchAllSpecialty();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        listSpecialty: this.props.data,
        isLoading: true,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }

  handleViewDetailSpecialty = (specialtyId) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialtyId.id}`);
    }
  };

  handleSearchSpecialty = (keyword) => {
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
    let { listSpecialty, keyword, isLoading } = this.state;

    // eslint-disable-next-line array-callback-return
    listSpecialty = listSpecialty.filter((clinic) => {
      if (keyword === '') {
        return listSpecialty;
      } else if (clinic.name.toLowerCase().includes(keyword.toLowerCase())) {
        return listSpecialty;
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
                      onClick={() => this.props.history.push('/home')}
                      style={{ cursor: 'pointer' }}
                    >
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>Danh sách các chuyên khoa</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Search
                  className='search'
                  keyword={keyword}
                  handleSearchSpecialty={this.handleSearchSpecialty}
                />
                {listSpecialty.length <= 0 ? (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    Không tìm thấy các chuyên khoa...
                  </div>
                ) : (
                  ''
                )}
                <div className='list__specialty--all'>
                  {listSpecialty.map(
                    (item, index) =>
                      index >= this.state.minIndex &&
                      index < this.state.maxIndex && (
                        <SpecialtyCard
                          key={index}
                          onClick={() => this.handleViewDetailSpecialty(item)}
                          image={item.image}
                          name={item.name}
                          description={item.description}
                        />
                      )
                  )}
                </div>
                <Pagination
                  current={this.state.current}
                  onChange={this.handleChangePageNumber}
                  pageSize={pageSize}
                  total={listSpecialty.length}
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
    data: state.admin.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListSpecialty)
);
