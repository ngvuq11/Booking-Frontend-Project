// import PropTypes from 'prop-types';
import { Card } from 'antd';
import React from 'react';
import './DoctorCard.scss';
const { Meta } = Card;

DoctorCard.propTypes = {};

function DoctorCard(props) {
  const { image, name, onClick } = props;
  return (
    <Card
      hoverable
      cover={<img alt='SpecialDoctorImg' src={image} />}
      onClick={onClick}
      className='doctor__card'
    >
      <Meta title={name} />
      {/* <Meta title={clinic} /> */}
      {/* <Meta title={address} /> */}
    </Card>
  );
}

export default DoctorCard;
