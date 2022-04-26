import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { getProfileDoctor } from '../../../services/userService';

import './ProfileDoctor.scss';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      // this.getInforDoctor(this.props.doctorId)
    }
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctor(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('dddd - MM/DD/YYYY');
      return (
        <>
          <div>
            {time} - {date}
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
      doctorName,
    } = this.props;
    let nameVi = '',
      nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <>
        <section className='intro-doctor'>
          <div
            className='intro-doctor-image'
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ''
              })`,
            }}
          ></div>
          <div className='intro-doctor-content'>
            <div className='doctor-title'>
              <h2>{language === LANGUAGES.VI ? nameVi : nameEn}</h2>
            </div>

            <div className='doctor-intro'>
              {isShowDescDoctor === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
              <div>
                <i className='fas fa-map-marker-alt'></i>
                {dataProfile &&
                  dataProfile.Doctor_Infor &&
                  dataProfile.Doctor_Infor.provinceIdData &&
                  language === LANGUAGES.VI && (
                    <span className='address'>
                      {dataProfile.Doctor_Infor.provinceIdData.valueVi}
                    </span>
                  )}
                {dataProfile &&
                  dataProfile.Doctor_Infor &&
                  dataProfile.Doctor_Infor.provinceIdData &&
                  language === LANGUAGES.EN && (
                    <span className='address'>
                      {dataProfile.Doctor_Infor.provinceIdData.valueEn}
                    </span>
                  )}
              </div>
            </div>
          </div>
        </section>
        {isShowLinkDetail === true && (
          <div className='view-detail-doctor'>
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className='doctor-price'>
            <FormattedMessage id='patient.extra-infor-doctor.examination-price' />
            <span>
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.VI && (
                  <NumberFormat
                    value={dataProfile.Doctor_Infor.priceIdData.valueVi}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' VND'}
                  />
                )}
            </span>
            <span>
              {dataProfile &&
                dataProfile.Doctor_Infor &&
                language === LANGUAGES.EN && (
                  <NumberFormat
                    value={dataProfile.Doctor_Infor.priceIdData.valueEn}
                    displayType={'text'}
                    thousandSeparator={true}
                    suffix={' $'}
                  />
                )}
            </span>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
