import React, { Component } from 'react';
import { connect } from 'react-redux';

class LikeAndShare extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  initFacebookSDK() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v13.0',
      });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = `//connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
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
