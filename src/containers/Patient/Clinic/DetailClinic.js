import { Breadcrumb, Pagination, Spin, Typography } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../components/Container/Container.styles';
import HomeHeader from '../../../components/Header/HomeHeader';
import Maps from '../../../components/Maps';
import { Section } from '../../../components/Secction/Section.styleds';
import SpecialtyCard from '../../../components/SpecialtyCard';
import Titles from '../../../components/Title';
import { getAllDetailClinicById } from '../../../services/userService';
import Footer from '../../HomePage/components/Section/Footer';
import './DetailClinic.scss';

const { Text } = Typography;

const pageSize = 4;
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailClinic: {},
      isLoading: false,
      current: 1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataDetailClinic: res.data,
          isLoading: true,
          minIndex: 0,
          maxIndex: pageSize,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
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
    let { dataDetailClinic, isLoading } = this.state;
    let listSpecialty = dataDetailClinic.specialtyClinic;

    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader />
            <Section className='page__detail--clinic'>
              <Container>
                <Breadcrumb
                  style={{
                    marginBottom: '20px',
                    background: '#fff',
                    padding: '10px 0',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <Breadcrumb.Item>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/home')}
                    >
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/list-doctor')}
                    >
                      Danh sách các phòng khám
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>{dataDetailClinic.name}</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                  <>
                    <Titles title={dataDetailClinic.name} />
                    <div
                      className='content-clinic'
                      dangerouslySetInnerHTML={{
                        __html: dataDetailClinic.descriptionHTML,
                      }}
                    ></div>
                  </>
                )}
                <Titles title={'Các chuyên khoa'} />
                <div className='list__specialty--all'>
                  {listSpecialty &&
                    listSpecialty.length > 0 &&
                    listSpecialty.map(
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
                  style={{ marginTop: '30px', textAlign: 'end' }}
                />
              </Container>
            </Section>
            <Maps address={dataDetailClinic.address} />

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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
