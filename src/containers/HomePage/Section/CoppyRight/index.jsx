import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
// import { FormattedMessage } from 'react-intl';

import '../../HomePage.scss';
const { Text } = Typography;

class CopyRight extends Component {
  render() {
    return (
      <section className='section-copyright'>
        <Text>2022 - Khoa Luan Team</Text>
      </section>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyRight);
