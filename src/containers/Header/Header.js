import { LoginOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Select, Space, Typography } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import * as actions from '../../store/actions';
import { LANGUAGES, USER_ROLE } from '../../utils';
import AdminMenu from './AdminMenu';
import DoctorMenu from './DoctorMenu';
import './Header.scss';

const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;
const { Text } = Typography;
class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
      collapsed: false,
      language: LANGUAGES.VI,
    };
  }
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
    });
  };
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    language = language === LANGUAGES.VI ? LANGUAGES.EN : LANGUAGES.VI;
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
    const { processLogout, userInfo, children } = this.props;
    const { collapsed, menuApp, language } = this.state;
    
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
                <Select
                  defaultValue={language}
                  style={{ width: 90 }}
                  onChange={(value) => this.handleChangeLanguage(value)}
                >
                  <Option value={LANGUAGES.VI}>VIE</Option>
                  <Option value={LANGUAGES.EN}>ENG</Option>
                </Select>
              </Space>
              <Space
                size={10}
                // style={{ background: '#fff', padding: '0 15px' }}
              >
                <Avatar size={40} icon={userInfo.image || <AiOutlineUser />} />
                <Text level={5} style={{ color: '#fff', width: '200px' }}>
                  {userInfo && userInfo.firstName + +userInfo.lastName
                    ? userInfo.firstName + ' ' + userInfo.lastName
                    : 'Error'}
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
                  overflow: 'scroll',
                }}
              >
                {children}
              </Content>
              <Footer style={{ textAlign: 'center', padding: '10px 0' }}>
                ©2022 Created by Ngvuq
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
