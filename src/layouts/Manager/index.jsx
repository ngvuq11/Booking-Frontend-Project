import React, { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import { Button, Layout, Row, Typography } from 'antd';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
import * as actions from '../../store/actions';
import { LANGUAGES, USER_ROLE } from '../../utils';
// import AdminMenu from './AdminMenu';
// import DoctorMenu from './DoctorMenu';

const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;

function ManagerLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Header
        theme='dark'
        className='header'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Logo />
        <Row>
          <FormattedMessage id='header.welcome' />
          {/* {userInfo && userInfo.firstName ? userInfo.firstName : ''} */}
          <Text>Language: </Text>
          <Text
            // className={
            //   language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'
            // }
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </Text>
          <Text
            // className={
            //   language === LANGUAGES.EN ? 'language-en active' : 'language-en'
            // }
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </Text>
          <Button
            type='danger'
            ghost
            // onClick={processLogout}
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
          onCollapse={onCollapse}
          style={{ paddingTop: '20px' }}
        >
          {/* {(menuApp === 'admin' && <AdminMenu />) ||
           (menuApp === 'doctor' && <DoctorMenu />
          )} */}
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
            {/* {children} */}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2022 Created by Ngvuq
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default ManagerLayout;
