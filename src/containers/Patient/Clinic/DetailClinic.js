import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../components/Header/HomeHeader';
import { getAllDetailClinicById } from '../../../services/userService';
import { withRouter } from 'react-router';

import _ from 'lodash';
import Footer from '../../HomePage/components/Section/Footer';
import { Breadcrumb, Spin, Typography } from 'antd';
import Maps from '../../../components/Maps';
import { Section } from '../../../components/Secction/Section.styleds';
import { Container } from '../../../components/Container/Container.styles';
import SpecialtyCard from '../../../components/SpecialtyCard';
import './DetailClinic.scss';

const { Text } = Typography;
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailClinic: {},
      isLoading: false,
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

  render() {
    let { dataDetailClinic, isLoading } = this.state;
    // let { language } = this.props;
    let listSpecialty = dataDetailClinic.specialtyClinic;

    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader />
            <Section>
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
                    <div className='name-clinic'>{dataDetailClinic.name}</div>
                    <div
                      className='content-clinic'
                      dangerouslySetInnerHTML={{
                        __html: dataDetailClinic.descriptionHTML,
                      }}
                    ></div>
                  </>
                )}
              <div className='special-flex'>
                {listSpecialty &&
                  listSpecialty.length > 0 &&
                  listSpecialty.map((item, index) => {
                    return (
                      <>
                        {/* <h3 className='clinic-title'>
                          Chuyên khoa thuộc phòng khám{' '}
                          <span className='clinic-name'>{item.name}</span>
                        </h3> */}
                        <div className='special-card'>
                          <SpecialtyCard
                            key={index}
                            onClick={() => this.handleViewDetailSpecialty(item)}
                            image={item.image}
                            description={item.description}
                            link={
                              <span
                                className='btn-link-item'
                                onClick={() =>
                                  this.handleViewDetailSpecialty(item)
                                }
                              >
                                Xem thêm
                              </span>
                            }
                            name={item.name}
                          />
                        </div>
                          </>
                    );
                  })}
                  </div>
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
