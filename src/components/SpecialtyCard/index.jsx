import { Image, Typography } from 'antd';
import React from 'react';
import './SpecialtyCard.scss';

const { Title, Text } = Typography;

function SpecialtyCard(props) {
  const { onClick, image, description, name } = props;
  return (
    <div onClick={onClick} className='specialty__card'>
      <Image src={image} preview={false} style={{ width: '100%' }} />
      <div className='specialty__card--bottom'>
        <Title level={3}>{name}</Title>
        <Text className='specialty__card--desc'>{description}</Text>
        <br />
      </div>
    </div>
  );
}

export default SpecialtyCard;
