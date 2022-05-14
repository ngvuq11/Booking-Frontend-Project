import { Row, Space, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Container } from '../../../../../components/Container/Container.styles';

const { Title, Text } = Typography;
const SectionWrapper = styled.section`
  margin-top: 50px;
  margin-bottom: 60px;
  width: 100%;
  padding: 100px 0px 100px 0px;
  background-image: url('https://images.unsplash.com/photo-1613918108466-292b78a8ef95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;
function Experience(props) {
  return (
    <SectionWrapper>
      <Container>
        <Space
          direction='vertical'
          size={40}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Title>Năng lực của chúng tôi</Title>
          <Text>
            Với đội ngũ y tế chuyên nghiệp, cùng với vật tư y tế hiện đại bật
            nhất, chúng tôi tự hào mang lại dịch vụ chăm sóc tốt nhất đến khách
            hàng
          </Text>
          <Space>
            <div>
              <Title>5</Title>
              <Text>Năm kinh nghiệm</Text>
            </div>
            <div>
              <Title>5</Title>
              <Text>Năm kinh nghiệm</Text>
            </div>
            <div>
              <Title>5</Title>
              <Text>Năm kinh nghiệm</Text>
            </div>
          </Space>
        </Space>
      </Container>
    </SectionWrapper>
  );
}

export default Experience;
