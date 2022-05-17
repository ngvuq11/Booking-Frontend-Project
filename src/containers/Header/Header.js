import { LoginOutlined } from '@ant-design/icons';
import { Avatar, Button, Layout, Typography, Select, Space } from 'antd';
import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AiOutlineUser } from 'react-icons/ai';
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
    console.log('language', language);
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
            <Space size={'large'}>
              <Select
                defaultValue={language}
                style={{ width: 120 }}
                onChange={(value) => this.handleChangeLanguage(value)}
              >
                <Option value={LANGUAGES.VI}>Việt Nam</Option>
                <Option value={LANGUAGES.EN}>English</Option>
              </Select>
              <Text style={{ color: '#fff' }}>
                <FormattedMessage id='header.welcome' />
                {userInfo && userInfo.firstName ? userInfo.firstName : ''}
              </Text>
              <Avatar size={45} icon={userInfo.image || <AiOutlineUser />} />
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
