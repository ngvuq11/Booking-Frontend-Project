import { Col, Image, Row } from 'antd';
import { push } from 'connected-react-router';
import React, { Component } from 'react';
// import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import passIcon from '../../src/assets/images/pass.svg';
import userIcon from '../../src/assets/images/user.svg';
import adminService from '../services/adminService';
import * as actions from '../store/actions';
import { KeyCodeUtils, LanguageUtils } from '../utils';

class Login extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
  }

  initialState = {
    username: '',
    password: '',
    loginError: '',
  };

  state = {
    ...this.initialState,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handlerKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlerKeyDown);
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  refresh = () => {
    this.setState({
      ...this.initialState,
    });
  };

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  redirectToSystemPage = () => {
    const { navigate } = this.props;
    const redirectPath = '/system/user-manage';
    navigate(`${redirectPath}`);
  };

  processLogin = () => {
    const { username, password } = this.state;

    const { adminLoginSuccess, adminLoginFail } = this.props;
    let loginBody = {
      username: 'admin',
      password: '123456',
    };
    //sucess
    let adminInfo = {
      tlid: '0',
      tlfullname: 'Administrator',
      custype: 'A',
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.luvEOkXfBZdktM_5z0tN9yhLloPp3VTZ7XnnivC2ngw',
    };

    adminLoginSuccess(adminInfo);
    this.refresh();
    this.redirectToSystemPage();
    try {
      adminService.login(loginBody);
    } catch (e) {
      console.log('error login : ', e);
    }
  };

  handlerKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      event.preventDefault();
      if (!this.btnLogin.current || this.btnLogin.current.disabled) return;
      this.btnLogin.current.click();
    }
  };

  render() {
    const { username, password, loginError } = this.state;
    const { lang } = this.props;

    return (
      <>
        <Row>
          <Col xs={16}>
            <Image src='https://source.unsplash.com/random' preview={false} />
          </Col>
          <Col xs={8}>
            <div className='login-wrapper'>
              <div className='login-container'>
                <div className='form_login'>
                  <h2 className='title'>
                    <FormattedMessage id='login.login' />
                  </h2>
                  <div className='form-group icon-true'>
                    <img className='icon' src={userIcon} alt='this' />
                    <input
                      placeholder={LanguageUtils.getMessageByKey(
                        'login.username',
                        lang
                      )}
                      id='username'
                      name='username'
                      type='text'
                      className='form-control'
                      value={username}
                      onChange={this.onUsernameChange}
                    />
                  </div>

                  <div
                    id='phone-input-container'
                    className='form-group icon-true'
                  >
                    <img className='icon' src={passIcon} alt='this' />
                    <input
                      placeholder={LanguageUtils.getMessageByKey(
                        'login.password',
                        lang
                      )}
                      id='password'
                      name='password'
                      type='password'
                      className='form-control'
                      value={password}
                      onChange={this.onPasswordChange}
                    />
                  </div>

                  {loginError !== '' && (
                    <div className='login-error'>
                      <span className='login-error-message'>{loginError}</span>
                    </div>
                  )}

                  <div className='form-group login'>
                    <input
                      ref={this.btnLogin}
                      id='btnLogin'
                      type='submit'
                      className='btn'
                      value={LanguageUtils.getMessageByKey('login.login', lang)}
                      onClick={this.processLogin}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
