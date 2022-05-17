import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;
const TitleWrap = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
  padding: 17px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
  h3 {
    font-size: 21px;
    text-transform: uppercase;
    margin-bottom: 0 !important;
    color: #ff9966;
    line-height: 25px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 5px;
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
