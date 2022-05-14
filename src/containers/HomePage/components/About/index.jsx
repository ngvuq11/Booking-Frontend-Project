import { Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import { Container } from '../../../../components/Container/Container.styles';
import { Section } from '../../../../components/Secction/Section.styleds';
import './About.scss';

About.propTypes = {};
const { Title, Text } = Typography;

function About(props) {
  return (
    <Section>
      <Container>
        <Row className='about__booking'>
          <Col span={16} className='about__booking--content'>
            <Space direction='vertical' size={30} style={{ display: 'flex' }}>
              <Row>
                <Col span={24}>
                  <Title level={2}>Tự tin mua sắm cùng ThinkPro</Title>
                </Col>

                <Col span={12} style={{ padding: '0 10px' }}>
                  <Title level={4}>Chế độ bảo hành tận tâm</Title>
                  <Text style={{ textAlign: 'justify' }}>
                    Tất cả các sản phẩm do ThinkPro bán ra đều được tuân thủ
                    điều kiện bảo hành của nhà cung cấp, hãng sản xuất. Nếu có
                    vấn đề về chất lượng sản phẩm, ThinkPro xin cam kết sẽ hỗ
                    trợ Quý khách tới cùng.
                  </Text>
                </Col>
                <Col span={12} style={{ padding: '0 10px' }}>
                  <Title level={4}>Chế độ bảo hành tận tâm</Title>
                  <Text style={{ textAlign: 'justify' }}>
                    Tất cả các sản phẩm do ThinkPro bán ra đều được tuân thủ
                    điều kiện bảo hành của nhà cung cấp, hãng sản xuất. Nếu có
                    vấn đề về chất lượng sản phẩm, ThinkPro xin cam kết sẽ hỗ
                    trợ Quý khách tới cùng.
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Title>Thông tin hữu ích</Title>
                </Col>
                <Col span={12}>
                  <div>
                    <Text>Hotline: 1900.63.3579</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text>Vận chuyển, thanh toán</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text>Hotline: 1900.63.3579</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text>Hotline: 1900.63.3579</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text>Hotline: 1900.63.3579</Text>
                  </div>
                </Col>
                <Col span={12}>
                  <div>
                    <Text>Hotline: 1900.63.3579</Text>
                  </div>
                </Col>
              </Row>
            </Space>
          </Col>
          <Col span={8}>
            <Image
              src='https://images.unsplash.com/photo-1550831106-0994fe8abcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
              preview={false}
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default About;
