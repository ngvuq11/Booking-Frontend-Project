import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';

class LikeAndShare extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.initFacebookSDK();
  }

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
      this.initFacebookSDK();
    }
  }

  initFacebookSDK() {
    let { language } = this.props;
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  render() {
    let { dataHref } = this.props;

    console.log(dataHref);
    return (
      <div
        class='fb-like'
        data-href={dataHref}
        data-width=''
        data-layout='button_count'
        data-action='like'
        data-size='small'
        data-share='true'
      ></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
