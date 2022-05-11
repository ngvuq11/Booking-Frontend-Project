import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;
const TitleWrap = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
  padding: 10px 0;
  margin-bottom: 20px;
  h3 {
    margin-bottom: 0 !important;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 4px;
    background: #62929e;
  }
`;
function Titles(props) {
  const title = props.title;
  return (
    <TitleWrap>
      <Title level={3}>{title}</Title>
    </TitleWrap>
  );
}

export default Titles;
