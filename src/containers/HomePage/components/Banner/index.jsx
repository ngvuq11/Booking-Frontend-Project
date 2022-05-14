import React from 'react';
// import PropTypes from 'prop-types';
import { Section } from '../../../../components/Secction/Section.styleds';
import { Container } from '../../../../components/Container/Container.styles';
import { Col, Image, Row, Space, Typography } from 'antd';
import './Banner.scss';

// Banner.propTypes = {};
const { Title, Text } = Typography;
function Banner(props) {
  return (
    <Section className='section__banner'>
      <Container>
        <Row gutter={15}>
          <Col span={18}>
            <Image
              src='https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1574&q=80'
              preview={false}
              className='banner__image'
            />
          </Col>
          <Col span={6}>
            <Space direction='vertical' className='banner__right--space'>
              <div className='banner__item'>
                <Title level={5}> Miễn phí vận chuyển</Title>
                <Text>
                  100% đơn hàng đều được miễn phí vận chuyển khi thanh toán
                  trước.
                </Text>
              </div>
              <div className='banner__item'>
                <Title level={5}> Miễn phí vận chuyển</Title>
                <Text>
                  100% đơn hàng đều được miễn phí vận chuyển khi thanh toán
                  trước.
                </Text>
              </div>
              <div className='banner__item'>
                <Title level={5}> Miễn phí vận chuyển</Title>
                <Text>
                  100% đơn hàng đều được miễn phí vận chuyển khi thanh toán
                  trước.
                </Text>
              </div>
            </Space>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default Banner;
