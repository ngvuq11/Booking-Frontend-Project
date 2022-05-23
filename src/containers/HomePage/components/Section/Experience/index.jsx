import { Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Container } from '../../../../../components/Container/Container.styles';
import {
  getAllClinic,
  getAllDoctors,
  getAllSpecialty,
} from '../../../../../services/userService';

const { Title, Text } = Typography;
const SectionWrapper = styled.section`
  width: 100%;
  padding: 300px 0px 300px 0px;
  background-image: url('https://images.unsplash.com/photo-1613918108466-292b78a8ef95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
  .ant-space-item {
    width: 100%;
    text-align: center;
    color: #fff;
  }
  .experience__space {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    .text-white {
      color: #fff;
    }
  }
  .experience__title {
    font-size: 16px;
    color: #fff;
    font-weight: bold;
  }
  .experience__desc {
    font-size: 18px;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .experience__heading {
    font-size: 36px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 20px;
    @media screen and (max-width: 768px) {
      font-size: 25px;
      margin-bottom: 20px;
    }
  }
`;
function Experience(props) {
  const [doctor, setDoctor] = useState([]);
  const [clinic, setClinic] = useState([]);
  const [specialty, setSpecialty] = useState([]);
  const sumDoctor = doctor.data?.length;
  const sumClinic = clinic.data?.length;
  const sumSpecialty = specialty.data?.length;

  useEffect(() => {
    const getDoctorInDB = async () => {
      try {
        const getSumDoctor = await getAllDoctors();
        const getSumClinic = await getAllClinic();
        const getSumSpecialty = await getAllSpecialty();
        setDoctor(getSumDoctor);
        setClinic(getSumClinic);
        setSpecialty(getSumSpecialty);
      } catch (error) {
        console.log(error);
      }
    };
    getDoctorInDB();
  }, []);
  return (
    <SectionWrapper>
      <Space
        direction='vertical'
        size={40}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className='experience__space'
      >
        <Container>
          <Title className='experience__heading'>
            <FormattedMessage id='home-page.experience.title' />
          </Title>
          <div className='experience__desc'>
            <FormattedMessage id='home-page.experience.desc' />
          </div>
          <Space
            size={20}
            style={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Title
                style={{ fontSize: '40px', color: '#fff', fontWeight: 'bold' }}
                level={1}
              >
                {sumSpecialty}
              </Title>
              <Text className='experience__title'>Phòng khám</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Title
                style={{ fontSize: '40px', color: '#fff', fontWeight: 'bold' }}
                level={1}
              >
                {sumClinic}
              </Title>
              <Text className='experience__title'>Chuyên khoa</Text>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Title
                style={{ fontSize: '40px', color: '#fff', fontWeight: 'bold' }}
                level={1}
              >
                {sumDoctor}
              </Title>
              <Text className='experience__title'>Bác sĩ</Text>
            </div>
          </Space>
        </Container>
      </Space>
    </SectionWrapper>
  );
}

export default Experience;
