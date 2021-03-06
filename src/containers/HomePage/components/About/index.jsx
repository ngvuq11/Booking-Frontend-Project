import { Button, Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import { Container } from '../../../../components/Container/Container.styles';
import Logo from '../../../../components/Logo';
import { Section } from '../../../../components/Secction/Section.styleds';
import Titles from '../../../../components/Title';
import './About.scss';

About.propTypes = {};
const { Text } = Typography;

function About(props) {
  return (
    <Section>
      <Container>
        <Row className='about__booking'>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={18}
            className='about__booking--content'
          >
            <Space direction='vertical' size={30} style={{ display: 'flex' }}>
              <Row className='about__space'>
                <Col span={24}>
                  <Logo />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Titles title={'TẦM NHÌN & SỨ MỆNH:'} />
                  <Text style={{ textAlign: 'justify' }}>
                    “Sự đổi mới các phương diện chất lượng y tế từ quản lý bệnh
                    nhân đến tiêu chuẩn dịch vụ khách hàng nhằm mang lại dịch vụ
                    chăm sóc sức khỏe ban đầu tốt nhất cho tất cả tầng lớp bệnh
                    nhân sẽ là mục tiêu và sứ mệnh mà phòng khám Pasteur theo
                    đuổi.”
                  </Text>
                  <Titles title={'THÔNG TIN HỮU ÍCH:'} />
                  <Space
                    direction='vertical'
                    style={{ display: 'flex', width: '100%' }}
                  >
                    <Button type='primary' ghost color='#55acee'>
                      Hotline: 1900.63.3579
                    </Button>

                    <Button type='primary' ghost color='#55acee'>
                      Emmail: Tdatn2022@gmail.com
                    </Button>
                    <Button type='primary' ghost color='#55acee'>
                      Address: 254 Nguyen Van Linh
                    </Button>
                  </Space>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  style={{ padding: '0 10px' }}
                >
                  <Titles title={'GIÁ TRỊ CỦA CHÚNG TÔI:'} />
                  <Text style={{ textAlign: 'justify' }}>
                    – Là sự kết hợp giữa tiêu chuẩn dịch vụ, phục vụ cao và chất
                    lượng khám nhằm mang lại giá trị tốt nhất cho bệnh nhân.{' '}
                    <br />– Là sự cân bằng giữa chất lượng trình độ chuyên môn
                    được trui rèn từ các bệnh viện lớn của Việt Nam, Pháp và nền
                    tảng giá trị đạo đức nghề nghệp. <br />– Tôn trọng, cống
                    hiến và tận tâm chăm sóc bệnh nhân là nguyên tắc tiên quyết
                    cho mọi thành viên Pasteur hướng tới và tuân thủ. <br />– Là
                    nơi quản lý và sao sát từng lượt khám chữa bệnh của khách
                    hàng thân chủ thông qua hệ thống bác sĩ gia đình. Từ đó, có
                    thể đưa ra những chẩn đoán bệnh và điều chuyển chuyên khoa
                    tốt nhất cho việc điều trị của bệnh nhân. <br />– Là sự lắng
                    nghe, chia sẻ và đồng hành giữa Bác sỹ, Nhân viên Y tế và
                    Bệnh nhân. <br />– Kinh doanh tử tế, giữ vững cái tâm của
                    người làm nghề Y: ” Chân thành với bệnh nhân, tử tế với đồng
                    nghiệp”
                  </Text>
                </Col>
              </Row>
            </Space>
          </Col>
          <Col xs={0} sm={0} md={0} lg={6}>
            <Image
              src='https://images.unsplash.com/photo-1550831106-0994fe8abcfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
              preview={false}
              className='about__booking--image'
            />
          </Col>
        </Row>
      </Container>
    </Section>
  );
}

export default About;
