import React from 'react';
// import PropTypes from 'prop-types';
import { Section } from '../../../../components/Secction/Section.styleds';
import { Container } from '../../../../components/Container/Container.styles';
import { Col, Image, Row, Space, Typography } from 'antd';
import './Banner.scss';
import bannerImage from '../../../../assets/banner/slider.jpg';

// Banner.propTypes = {};
const { Title, Text } = Typography;
function Banner(props) {
  return (
    <Section className='section__banner'>
      <Container>
        <Row gutter={15}>
          <Col span={18}>
            <Image
              src={bannerImage}
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
