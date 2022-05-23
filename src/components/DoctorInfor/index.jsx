import { Button, Image, Space } from 'antd';
import React from 'react';
import { LANGUAGES } from '../../utils';
import Titles from '../Title';
import './DoctorInfor.scss';

DoctorInfor.propTypes = {};

function DoctorInfor(props) {
  const { item, language, onClick } = props;
  let imageBase64 = '';
  if (item.image) {
    imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
  }
  let nameVi = `${item.lastName} ${item.firstName}`;
  let nameEn = `${item.firstName} ${item.lastName}`;

  return (
    <div className='doctor-item'>
      <Image src={imageBase64} preview={false} />
      <Space direction='vertical' className='doctor-item-infor'>
        <Titles title={`${language === LANGUAGES.VI ? nameVi : nameEn}`} />
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
        <Button type='link' onClick={onClick}>
          Xem thêm
        </Button>
      </Space>
    </div>
  );
}

export default DoctorInfor;
