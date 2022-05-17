import { Breadcrumb, Space, Spin, Typography } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '../../../components/Container/Container.styles';
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../../components/Header/HomeHeader';
import { Section } from '../../../components/Secction/Section.styleds';
import {
  getAllCodeService,
  getAllDetailSpecialtyById,
} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import Footer from '../../HomePage/components/Section/Footer';
import ProfileDoctor from '../Doctor/ProfileDoctor/index';
import './DetailSpecialty.scss';

const { Text } = Typography;
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
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

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: 'ALL',
      });

      let resProvince = await getAllCodeService('PROVINCE');

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            // eslint-disable-next-line array-callback-return
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keymap: 'ALL',
            type: 'PROVINCE',
            valueEn: 'ALL',
            valueVi: 'Toàn quốc',
          });
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
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

  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            // eslint-disable-next-line array-callback-return
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  chosePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince, isLoading } =
      this.state;
    let { language } = this.props;
    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader />
            <Section className='section__detail--specialty'>
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
                    <Text>{dataDetailSpecialty.name}</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                  <div
                    className='detail__specialty--description'
                    dangerouslySetInnerHTML={{
                      __html: dataDetailSpecialty.descriptionHTML,
                    }}
                  ></div>
                )}
                <div>
                  <Space
                    direction='vertical'
                    size={20}
                    style={{ display: 'flex' }}
                  >
                    <select
                      onChange={(event) => this.handleOnChangeSelect(event)}
                      className='select-location'
                    >
                      {listProvince &&
                        listProvince.length > 0 &&
                        listProvince.map((item, index) => {
                          return (
                            <option key={index} value={item.keymap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                    <Space
                      direction='vertical'
                      size={20}
                      className='list__doctor--suggest'
                    >
                      {arrDoctorId &&
                        arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                          return (
                            <ProfileDoctor
                              doctorId={item}
                              isShowDescDoctor={true}
                              isShowLinkDetail={true}
                              isShowPrice={false}
                              isShowCalendarDoctor={true}
                              // dataTime={dataTime}
                            />
                          );
                        })}
                    </Space>
                  </Space>
                </div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
