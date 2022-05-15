import { Button, Image, Typography } from 'antd';
import React from 'react';
import './ClinicCard.scss';

const { Title, Text } = Typography;
function ClinicCard(props) {
  const { image, name, address, onClick } = props;
  return (
    <div className='clinic__card' onClick={onClick}>
      <Image src={image} preview={false} className='clinic__card--image' />
      <div className='clinic__card--bottom'>
        <Title level={3}> {name}</Title>
        <Text>{address}</Text>
        <Button type='primary' ghost>
          See More
        </Button>
      </div>
    </div>
  );
}

export default ClinicCard;
