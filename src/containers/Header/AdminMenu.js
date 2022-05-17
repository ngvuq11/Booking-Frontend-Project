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
      pathName: 'dashboard',
      to: '/system/dashboard',
    },
    {
      key: 2,
      icon: <BsFillCalendarDateFill />,
      text: <FormattedMessage id='menu.admin.manage-user' />,
      pathName: 'manage-user',
      to: '/system/manage-user',
    },
    {
      key: 3,
      icon: <BsFillPersonFill />,
      text: <FormattedMessage id='menu.admin.manage-doctor' />,
      pathName: 'manage-doctor',
      to: '/system/manage-doctor',
    },
    {
      key: 4,
      icon: <ContainerOutlined />,
      text: <FormattedMessage id='menu.admin.manage-specialty' />,
      pathName: 'manage-specialty',
      to: '/system/manage-specialty',
    },
    {
      key: 5,
      icon: <ContainerOutlined />,
      text: <FormattedMessage id='menu.admin.manage-clinic' />,
      pathName: 'manage-clinic',
      to: '/system/manage-clinic',
    },
    {
      key: 6,
      icon: <ContainerOutlined />,
      text: <FormattedMessage id='menu.admin.manage-handbook' />,
      pathName: 'manage-handbook',
      to: '/system/manage-handbook',
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
    </Menu>
  );
}

export default AdminMenu;
