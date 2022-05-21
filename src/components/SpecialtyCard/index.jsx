import { Image, Typography } from 'antd';
import React from 'react';
import './SpecialtyCard.scss';

const { Title, Text } = Typography;

function SpecialtyCard(props) {
  const { onClick, image, description, name, link } = props;
  return (
    <div onClick={onClick} className='specialty__card'>
      <Image src={image} preview={false} style={{ width: '100%' }} />
      <div className='specialty__card--bottom'>
        <Title level={3}>{name}</Title>
        <Text>{description}</Text>
        <br />
        <Text>{link}</Text>
      </div>
    </div>
  );
}

export default SpecialtyCard;
