import React from 'react';
import { Typography } from 'antd';
import { withRouter } from 'react-router';
import './Logo.scss';

const { Text } = Typography;
class Logo extends React.Component {
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    return (
      <div className='logo--main'>
        <Text className='logo__content' onClick={() => this.returnToHome()}>
          BCARE.vn
        </Text>
      </div>
    );
  }
}

export default withRouter(Logo);
