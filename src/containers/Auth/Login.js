import { Button, Form, Input, Space } from 'antd';
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../components/Logo';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import * as actions from '../../store/actions';
import './Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowPassword: false,
      errMessage: '',
    };
  }
  // componentDidUpdate(prevProps, prevState) {
  //     this.setState({
  //         username: "",
  //         password: "",
  //     });
  // }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: '',
    });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      } else if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
      console.log('errro: ', error.response);
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className='login__page'>
        <Space direction='vertical' size={20} className='login__form'>
          <Logo />
          <Space
            direction='vertical'
            size={10}
            style={{ display: 'flex', width: '100%' }}
          >
            <Form
              layout='vertical'
              name='basic'
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                label='Email'
                required
                tooltip='This is a required field'
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input
                  placeholder='Type your email'
                  value={this.state.username}
                  onChange={(event) => {
                    this.handleOnChangeUsername(event);
                  }}
                />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                required
                tooltip='This is a required field'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangePassword(event);
                  }}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />
              </Form.Item>

              <Form.Item
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={() => {
                    this.handleLogin();
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Space>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
