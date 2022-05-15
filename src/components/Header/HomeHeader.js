import { Select, Space, Typography } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import timeWorking from '../../assets/icon/gio-h.png';
import phoneIcon from '../../assets/icon/phone-h.png';
import { Container } from '../../components/Container/Container.styles';
import Logo from '../../components/Logo';
import { changeLanguageApp } from '../../store/actions';
import { LANGUAGES } from '../../utils';
import './HomeHeader.scss';

const { Text } = Typography;
const { Option } = Select;

class HomeHeader extends Component {
  handleChangeLanguage = (value) => {
    this.props.changeLanguageAppRedux(value);
  };

  handleListSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/list-specialty`);
    }
  };

  handleListClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/list-clinic`);
    }
  };

  handleListDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/list-doctor`);
    }
  };

  handleCovid19 = () => {
    if (this.props.history) {
      this.props.history.push(`/covid-19`);
    }
  };
  render() {
    return (
      <div className='header'>
        <Container>
          <div className='header__top--wrap'>
            <Logo />
            <div className='header__contact'>
              <div className='header__contact--item'>
                <img src={timeWorking} alt='' />
                <div>
                  <p
                    style={{
                      marginBottom: '0px',
                      fontWeight: 'bold',
                      fontSize: '15px',
                    }}
                  >
                    Giờ khám bệnh
                    <span style={{ marginLeft: '5px', color: '#ff6633' }}>
                      8:00 - 22:00
                    </span>
                  </p>
                  <p style={{ marginBottom: '0px' }}>
                    <span style={{ color: '#ff6633' }}>
                      Tất cả các ngày trong tuần
                    </span>
                  </p>
                </div>
              </div>
              <div className='header__contact--item'>
                <img src={phoneIcon} alt='phone icon' />
                <div className='header__contact--infor'>
                  <Text strong style={{ fontSize: '15px' }}>
                    Hotline
                  </Text>
                  <Text style={{ color: '#ff6633' }}>0236 9999 868</Text>
                </div>
              </div>
            </div>
            <Select
              defaultValue={LANGUAGES.VI}
              style={{ width: 120 }}
              onChange={(value) => this.handleChangeLanguage(value)}
            >
              <Option value={LANGUAGES.VI}>Việt Nam</Option>
              <Option value={LANGUAGES.EN}>English</Option>
            </Select>
          </div>
          <div className='navigation__wrap'>
            <Space size={'large'}>
              <Text onClick={() => this.handleListSpecialty()}>
                <FormattedMessage id='header.specialty-menu' />
              </Text>
              <Text onClick={() => this.handleListClinic()}>
                <FormattedMessage id='header.clinic-menu' />
              </Text>
              <Text onClick={() => this.handleListDoctor()}>
                <FormattedMessage id='header.doctor-menu' />
              </Text>
              <Text onClick={() => this.handleCovid19()}>
                <FormattedMessage id='header.covid-19' />
              </Text>
            </Space>
            <Select
              defaultValue={LANGUAGES.VI}
              style={{ width: 120 }}
              onChange={(value) => this.handleChangeLanguage(value)}
            >
              <Option value={LANGUAGES.VI}>Việt Nam</Option>
              <Option value={LANGUAGES.EN}>English</Option>
            </Select>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
