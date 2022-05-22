import { Button, Image, Space, Typography } from 'antd';
import React from 'react';
import './BlogCard.scss';

const { Text } = Typography;

function BlogCard(props) {
  const { name, key, onClick, image } = props;

  return (
    <div key={key} className='blog__item'>
      <Image src={image} preview={false} />
      <Space direction='vertical' size={'large'} className='blog__item--space'>
        <Text className='blog__item--name'>{name}</Text>
        <Button
          type='primary'
          style={{ width: '60%', margin: '0 auto' }}
          onClick={onClick}
        >
          Xem thêm
        </Button>
      </Space>
    </div>
  );
}

export default BlogCard;
