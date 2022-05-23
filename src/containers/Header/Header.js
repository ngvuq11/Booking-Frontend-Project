import { LoginOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Space, Typography } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Language from '../../components/Language';
import Logo from '../../components/Logo';
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
  render() {
    const { processLogout, userInfo, children, language } = this.props;
    const { collapsed, menuApp } = this.state;

    return (
      <>
        <Layout
          style={{
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <Header
            className='header'
            style={{
              display: 'flex',
              gap: '50px',
              background: '#001529',
              //   background: '#38A169',
            }}
          >
            <Logo />
            <Space
              size={'large'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Space>
                <Text style={{ color: '#fff' }}>Select language:</Text>
                <Language />
              </Space>
              <Space
                size={10}
                // style={{ background: '#fff', padding: '0 15px' }}
              >
                <Avatar size={40} src={userInfo.image} />

                <Text level={5} style={{ color: '#fff', width: '200px' }}>
                  {language && language === LANGUAGES.VI
                    ? userInfo.lastName + ' ' + userInfo.firstName
                    : userInfo.firstName + ' ' + userInfo.lastName}
                  {/* {userInfo && userInfo.firstName + +userInfo.lastName
                    ? userInfo.firstName + ' ' + userInfo.lastName
                    : 'Error'} */}
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
              </Space>
            </Space>
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
                  overflowY: 'scroll',
                }}
              >
                {children}
              </Content>
              <Footer
                style={{
                  textAlign: 'center',
                  padding: '10px 0',
                  background: '#ccc',
                }}
              >
                ©2022 Created by Bcare
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </>
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
