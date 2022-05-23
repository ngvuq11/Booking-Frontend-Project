import React from 'react';
// import PropTypes from 'prop-types';
import { Section } from '../../../../components/Secction/Section.styleds';
import { Container } from '../../../../components/Container/Container.styles';
import { Col, Image, Row, Space, Typography } from 'antd';
import Slider from 'react-slick';
import './Banner.scss';
import { FormattedMessage } from 'react-intl';

const bannerImage = [
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1191&q=80',
  'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1619975102725-597d006b1a0f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
];
const { Title, Text } = Typography;
function Banner(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    cssEase: 'linear',
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className='ft-slick__dots--custom'>
        <div className='loading' />
      </div>
    ),
  };
  return (
    <Section className='section__banner'>
      <Container>
        <Row gutter={15}>
          <Col xs={24} sm={24} md={24} lg={18}>
            <Slider {...settings}>
              {bannerImage.map((item) => (
                <div key={item}>
                  <Image
                    className='banner__image'
                    src={item}
                    alt=''
                    preview={false}
                  />
                </div>
              ))}
            </Slider>
          </Col>
          <Col xs={24} sm={24} md={24} lg={6}>
            <Space direction='vertical' className='banner__right--space'>
              <div className='banner__item'>
                <Title
                  level={5}
                  style={{ fontWeight: '900', color: '#ff6633' }}
                >
                  <FormattedMessage id='home-page.banner.title1' />
                </Title>
                <Text>
                  <FormattedMessage id='home-page.banner.desc1' />
                </Text>
              </div>
              <div className='banner__item'>
                <Title
                  level={5}
                  style={{ fontWeight: '900', color: '#ff6633' }}
                >
                  <FormattedMessage id='home-page.banner.title2' />
                </Title>
                <Text>
                  <FormattedMessage id='home-page.banner.desc2' />
                </Text>
              </div>
              <div className='banner__item'>
                <Title
                  level={5}
                  style={{ fontWeight: '900', color: '#ff6633' }}
                >
                  {' '}
                  <FormattedMessage id='home-page.banner.title3' />
                </Title>
                <Text>
                  <FormattedMessage id='home-page.banner.desc3' />
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
