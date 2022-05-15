import { Image, Typography } from 'antd';
import React from 'react';
import './SpecialtyCard.scss';

const { Title } = Typography;

function SpecialtyCard(props) {
  const { onClick, image, description, name } = props;
  return (
    <div onClick={onClick} className='specialty__card'>
      <Image src={image} preview={false} style={{ width: '100%' }} />
      <div className='specialty__card--bottom'>
        <Title level={3}>{name}</Title>
        <div
          className='specialty__card--description'
          dangerouslySetInnerHTML={{
            __html: { description },
          }}
        ></div>
      </div>
    </div>
  );
}

export default SpecialtyCard;
