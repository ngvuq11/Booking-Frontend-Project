import { Button, Space, Typography } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import timeWorking from '../../assets/icon/gio-h.png';
import phoneIcon from '../../assets/icon/phone-h.png';
import { Container } from '../../components/Container/Container.styles';
import Logo from '../../components/Logo';
import { changeLanguageApp } from '../../store/actions';
import Language from '../Language';
import './HomeHeader.scss';

const { Text } = Typography;

class HomeHeader extends Component {
  state = {
    isOpen: false,
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

  handleBlogs = () => {
    if (this.props.history) {
      this.props.history.push(`/list-blogs`);
    }
  };

  handleCovid19 = () => {
    if (this.props.history) {
      this.props.history.push(`/covid-19`);
    }
  };

  handleLogin = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };
  handleCloseMenu = () => {
    this.setState({
      isOpen: false,
    });
  };
  handleOpenMenu = () => {
    this.setState({
      isOpen: true,
    });
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

            {this.state.isOpen ? (
              <>
                <Language />
              </>
            ) : (
              <>
                <Button
                  type=''
                  icon={<AiOutlineMenu />}
                  className='button-mobile'
                  onClick={() => this.handleOpenMenu()}
                >
                  Menu
                </Button>
                <Language />
              </>
            )}
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
              <Text onClick={() => this.handleBlogs()}>
                <FormattedMessage id='header.blogs-menu' />
              </Text>
              <Text onClick={() => this.handleCovid19()}>
                <FormattedMessage id='header.covid-19' />
              </Text>
            </Space>
            <Language />
          </div>
          {this.state.isOpen ? (
            <div className='navigation__wrap--mobile'>
              <Space size={'large'}>
                <Button
                  type='link'
                  icon={<MdOutlineKeyboardBackspace />}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onClick={() => this.handleCloseMenu()}
                >
                  Close
                </Button>
                <Logo />
                <Text onClick={() => this.handleListSpecialty()}>
                  <FormattedMessage id='header.specialty-menu' />
                </Text>
                <Text onClick={() => this.handleListClinic()}>
                  <FormattedMessage id='header.clinic-menu' />
                </Text>
                <Text onClick={() => this.handleListDoctor()}>
                  <FormattedMessage id='header.doctor-menu' />
                </Text>
                <Text onClick={() => this.handleBlogs()}>
                  <FormattedMessage id='header.blogs-menu' />
                </Text>
                <Text onClick={() => this.handleCovid19()}>
                  <FormattedMessage id='header.covid-19' />
                </Text>
              </Space>
            </div>
          ) : (
            <></>
          )}
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
