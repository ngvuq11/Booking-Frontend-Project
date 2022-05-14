import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;
const CoppyRightWrapper = styled.div`
  width: 100%;
  background-color: #eee;
  color: #333;
  text-align: center;
  padding: 10px 0;
`;
class CopyRight extends Component {
  render() {
    return (
      <CoppyRightWrapper>
        <Text>2022 - Khoa Luan Team</Text>
      </CoppyRightWrapper>
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
