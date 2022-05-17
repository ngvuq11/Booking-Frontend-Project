import React from 'react';
import { BsFillCalendarDateFill, BsFillPersonFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { Menu } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { split } from 'lodash';
import { useHistory, useLocation } from 'react-router';

function DoctorMenu(props) {
  const history = useHistory();
  const location = useLocation();
  const isActive = (menuItem) => {
    return location.pathname / split('/doctor')[1] === menuItem.path;
  };
  const menu = [
    {
      key: 1,
      icon: <MdDashboard />,
      text: 'Dashboard',
      pathName: 'dashboard-doctor',
      to: '/doctor/dashboard-doctor',
    },
    {
      key: 2,
      icon: <BsFillCalendarDateFill />,
      text: <FormattedMessage id='menu.doctor.manage-schedule' />,
      pathName: 'manage-schedule',
      to: '/doctor/manage-schedule',
    },
    {
      key: 3,
      icon: <BsFillPersonFill />,
      text: <FormattedMessage id='menu.doctor.manage-patient' />,
      pathName: 'manage-patient',
      to: '/doctor/manage-patient',
    },
    {
      key: 4,
      icon: <ContainerOutlined />,
      text: <FormattedMessage id='menu.doctor.manage-medical-record' />,
      pathName: 'manage-medical-record',
      to: '/doctor/manage-medical-record',
    },
  ];

  return (
    <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
      {menu.map((item) => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={() => history.push(item.to)}
        >
          {item.text}
        </Menu.Item>
      ))}
      {/* <Menu.Item
        key={[1]}
        // onClick={() => this.props.history.push('/doctor/dashboard-doctor')}
        icon={<MdDashboard />}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/doctor/manage-schedule')}
        icon={<BsFillCalendarDateFill />}
      >
        <FormattedMessage id='menu.doctor.manage-schedule' />
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/doctor/manage-patient')}
        icon={<BsFillPersonFill />}
      >
        <FormattedMessage id='menu.doctor.manage-patient' />
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/doctor/manage-medical-record')}
        icon={<ContainerOutlined />}
      >
        <FormattedMessage id='menu.doctor.manage-medical-record' />
      </Menu.Item> */}
    </Menu>
  );
}

export default DoctorMenu;
