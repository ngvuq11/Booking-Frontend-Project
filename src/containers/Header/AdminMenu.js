import React from 'react';
import { BsFillCalendarDateFill, BsFillPersonFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { Menu } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router';
import { split } from 'lodash';

function AdminMenu(props) {
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
      <Menu.Item
        key={[1]}
        // onClick={() => this.props.history.push('/system/dashboard')}
        icon={<MdDashboard />}
      >
        Dashboard
      </Menu.Item>
      <Menu.Item
        // onSelect={() => this.props.history.push('/system/manage-user')}
        icon={<BsFillCalendarDateFill />}
      >
        <FormattedMessage id='menu.admin.manage-user' />
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/system/manage-doctor')}
        icon={<BsFillPersonFill />}
      >
        <FormattedMessage id='menu.admin.manage-doctor' />
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/system/manage-specialty')}
        icon={<ContainerOutlined />}
      >
        <FormattedMessage id='menu.admin.manage-specialty' />
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/system/manage-specialty')}
        icon={<ContainerOutlined />}
      >
        <FormattedMessage id='menu.admin.manage-clinic' />
      </Menu.Item>
      <Menu.Item
        // onClick={() => this.props.history.push('/system/manage-specialty')}
        icon={<ContainerOutlined />}
      >
        <FormattedMessage id='menu.admin.manage-handbook' />
      </Menu.Item>
    </Menu>
  );
}

export default AdminMenu;
