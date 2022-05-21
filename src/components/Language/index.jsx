import { Switch } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeLanguageApp } from '../../store/actions';
import { LANGUAGES } from '../../utils';
import './Language.scss';

class Language extends Component {
  handleCheck = (check) => {
    this.props.changeLanguageAppRedux(check ? LANGUAGES.VI : LANGUAGES.EN);
  };

  render() {
    let language = this.props.language;
    return (
      <Switch
        checkedChildren='VIE'
        unCheckedChildren='ENG'
        checked={language === LANGUAGES.VI ? true : false}
        // defaultChecked
        onChange={(check) => this.handleCheck(check)}
      />
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
  connect(mapStateToProps, mapDispatchToProps)(Language)
);
