import { LoginOutlined } from '@ant-design/icons';
import { Button, Layout, Row, Typography } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import ManagerLayout from '../../layouts/Manager';
import * as actions from '../../store/actions';
import { LANGUAGES, USER_ROLE } from '../../utils';
import AdminMenu from './AdminMenu';
import DoctorMenu from './DoctorMenu';
import './Header.scss';

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;
class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = 'admin';
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = 'doctor';
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo, children } = this.props;
    const { collapsed, menuApp } = this.state;
    return (
      <>
        <Layout
          style={{
            minHeight: '100vh',
          }}
        >
          <Header
            className='header'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              background: '#001529',
            }}
          >
            <Logo />
            <Row>
              <FormattedMessage id='header.welcome' />
              {userInfo && userInfo.firstName ? userInfo.firstName : ''}
              <Text>Language: </Text>
              <Text
                className={
                  language === LANGUAGES.VI
                    ? 'language-vi active'
                    : 'language-vi'
                }
                onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
              >
                VN
              </Text>
              <Text
                className={
                  language === LANGUAGES.EN
                    ? 'language-en active'
                    : 'language-en'
                }
                onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
              >
                EN
              </Text>
              <Button
                type='danger'
                ghost
                onClick={processLogout}
                title='Logout'
                icon={<LoginOutlined />}
              >
                Log out
              </Button>
            </Row>
          </Header>

          <Layout>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.onCollapse}
              style={{ paddingTop: '20px' }}
            >
              {(menuApp === 'admin' && <AdminMenu />) ||
                (menuApp === 'doctor' && <DoctorMenu />)}
            </Sider>
            <Layout className='site-layout'>
              <Content
                className='site-layout-background'
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                }}
              >
                {children}
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                ©2022 Created by Ngvuq
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </>
      // <div className='header-container'>
      //   <Logo />

      //   <div className='languages'>
      //     <div className='welcome'>
      //       <FormattedMessage id='header.welcome' />
      //       {userInfo && userInfo.firstName ? userInfo.firstName : ''}
      //     </div>
      //     <span>Language: </span>
      //     <span
      //       className={
      //         language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'
      //       }
      //       onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
      //     >
      //       VN
      //     </span>
      //     <span
      //       className={
      //         language === LANGUAGES.EN ? 'language-en active' : 'language-en'
      //       }
      //       onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
      //     >
      //       EN
      //     </span>
      //   </div>

      //   <div className='header-tabs-container'>
      //     {/* <Navigator menus={menuApp} /> */}
      //     {menuApp}
      //   </div>

      //   <div className='logout'>
      //     <button className='btn-logout' onClick={processLogout} title='Logout'>
      //       Log out
      //       <i className='fas fa-sign-out-alt'></i>
      //     </button>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
