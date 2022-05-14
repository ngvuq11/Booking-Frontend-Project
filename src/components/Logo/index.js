import React from 'react';
import { Typography } from 'antd';
import { withRouter } from 'react-router';
import styled from 'styled-components';

const { Text } = Typography;

const LogoWrapper = styled.div`
  .logo__content {
    font-size: 30px;
    font-weight: bold;
    color: #ff0707d9;
    letter-spacing: 1px;
    cursor: pointer;
    user-select: none;
  }
`;

class Logo extends React.Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    return (
      <LogoWrapper>
        <Text className='logo__content' onClick={() => this.returnToHome()}>
          Booking.
        </Text>
      </LogoWrapper>
    );
  }
}

export default withRouter(Logo);
