import { Button } from 'antd';
import React from 'react';
import { LANGUAGES } from '../../utils';
import './DoctorInfor.scss';

DoctorInfor.propTypes = {};

function DoctorInfor(props) {
  const { item, index, language } = props;
  let imageBase64 = '';
  if (item.image) {
    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
  }
  let nameVi = `${item.lastName} ${item.firstName}`;
  let nameEn = `${item.firstName} ${item.lastName}`;

  return (
    <div className='doctor-item' key={index}>
      <div
        className='doctor-item-image'
        style={{ backgroundImage: `url(${imageBase64})` }}
      ></div>
      <div className='doctor-item-infor'>
        <div className='name'>
          <span>Doctor: </span>
          {language === LANGUAGES.VI ? nameVi : nameEn}
        </div>
        <div>
          <span>Email: </span>
          {item.email}
        </div>
        <div>
          <span>Phone number: </span>
          {item.phoneNumber}
        </div>
        <div>
          <span>Address: </span>
          {item.address}
        </div>
        <Button
          type='primary'
          ghost
          onClick={() => this.handleViewDetailDoctor(item)}
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
}

export default DoctorInfor;
