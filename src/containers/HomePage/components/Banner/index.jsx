import React from 'react';
// import PropTypes from 'prop-types';
import { Section } from '../../../../components/Secction/Section.styleds';
import { Container } from '../../../../components/Container/Container.styles';
import { Col, Image, Row, Space, Typography } from 'antd';
import Slider from 'react-slick';
import './Banner.scss';

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
                  Được Sở Y Tế cấp phép
                </Title>
                <Text>
                  Phòng khám được Sở Y Tế cấp phép hoạt động, phê duyệt danh mục
                  kỹ thuật khám chữa đảm bảo tính pháp lý
                </Text>
              </div>
              <div className='banner__item'>
                <Title
                  level={5}
                  style={{ fontWeight: '900', color: '#ff6633' }}
                >
                  Đội ngũ bác sĩ chuyên môn cao
                </Title>
                <Text>
                  Đội ngũ bác sĩ, thạc sĩ, tiến sĩ đầu ngành với hơn 20 năm kinh
                  nghiệm và đội ngũ bác sĩ trẻ tài năng, nhiệt huyết với nghề
                </Text>
              </div>
              <div className='banner__item'>
                <Title
                  level={5}
                  style={{ fontWeight: '900', color: '#ff6633' }}
                >
                  {' '}
                  Dịch vụ khám chữa chất lượng
                </Title>
                <Text>
                  Dịch vụ y tế chất lượng cao, phục vụ bệnh nhân khi đến khám
                  chữa bệnh tận tình, mội lúc, mọi nơi
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
