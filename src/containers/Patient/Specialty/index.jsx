import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../../components/Header/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule/index';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor/index';
import ProfileDoctor from '../Doctor/ProfileDoctor/index';
import {
  getAllDetailSpecialtyById,
  getAllCodeService,
} from '../../../services/userService';

import './DetailSpecialty.scss';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';
import Footer from '../../HomePage/components/Section/Footer';
import { Space, Spin } from 'antd';

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

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince, isLoading } =
      this.state;
    let { language } = this.props;
    return (
      <>
        {isLoading ? (
          <>
            <div className='detail-specialty'>
              <HomeHeader />
              <section className='banner'>
                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailSpecialty.descriptionHTML,
                    }}
                  ></div>
                )}
              </section>
              <section className='search-location'>
                <select onChange={(event) => this.handleOnChangeSelect(event)}>
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
              </section>
              <section className='specialty-list'>
                {arrDoctorId &&
                  arrDoctorId.length > 0 &&
                  arrDoctorId.map((item, index) => {
                    return (
                      <div className='specialty-item' key={index}>
                        <div className='intro'>
                          <div className='profile-doctor'>
                            <ProfileDoctor
                              doctorId={item}
                              isShowDescDoctor={true}
                              isShowLinkDetail={true}
                              isShowPrice={false}
                              // dataTime={dataTime}
                            />
                          </div>
                        </div>
                        <Space
                          direction='vertical'
                          size={15}
                          style={{ display: 'flex' }}
                          className='schedule'
                        >
                          <DoctorSchedule doctorIdFromParent={item} />
                          <DoctorExtraInfor doctorIdFromParent={item} />
                        </Space>
                      </div>
                    );
                  })}
              </section>

              <Footer />
            </div>
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
