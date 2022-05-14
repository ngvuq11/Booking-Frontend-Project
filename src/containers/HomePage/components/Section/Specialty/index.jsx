import { Button, Col, Image, Row, Space, Typography } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
import { Container } from '../../../../../components/Container/Container.styles';
import { Section } from '../../../../../components/Secction/Section.styleds';
import Titles from '../../../../../components/Title';
import { getTopSpecialty } from '../../../../../services/userService';
import './Specialty.scss';

const { Title } = Typography;
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getTopSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      // autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      cssEase: 'linear',
      appendDots: (dots) => <ul>{dots}</ul>,
      customPaging: (i) => (
        <div className='ft-slick__dots--custom'>
          <div className='loading' />
        </div>
      ),
    };
    return (
      <Section className='section__specialty'>
        <Container>
          <Space direction='vertical' size={10} style={{ display: 'flex' }}>
            <Titles
              title={<FormattedMessage id='home-page.specialty-popular' />}
            />
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <Row
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <Col span={12}>
                        <Image
                          src={item.image}
                          preview={false}
                          style={{ width: '100%' }}
                        />
                      </Col>
                      <Col span={12}>
                        <Title level={3}>{item.name}</Title>
                        <div
                          className='specialty__description'
                          dangerouslySetInnerHTML={{
                            __html: item.descriptionHTML,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  );
                })}
            </Slider>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button type='danger' ghost>
                Xem tất cả
              </Button>
            </div>
          </Space>
        </Container>
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
