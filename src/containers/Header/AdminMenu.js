import React from 'react';
import { Menu } from 'antd';
import { MdDashboard } from 'react-icons/md';
import { FormattedMessage } from 'react-intl';
import { ContainerOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router';
import { BsFillCalendarDateFill, BsFillPersonFill } from 'react-icons/bs';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { FaMoneyCheckAlt } from 'react-icons/fa';

function AdminMenu(props) {
  const history = useHistory();
  const location = useLocation();

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
      icon: <GiMagnifyingGlass />,
      text: <FormattedMessage id='menu.admin.manage-specialty' />,
      pathName: 'manage-specialty',
      to: '/system/manage-specialty',
    },
    {
      key: 5,
      icon: <AiFillHome />,
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
    {
      key: 7,
      icon: <FaMoneyCheckAlt />,
      text: <FormattedMessage id='menu.admin.manage-payment' />,
      pathName: 'manage-payment',
      to: '/system/manage-payment',
    },
  ];
  return (
    <Menu
      theme='dark'
      mode='inline'
      defaultSelectedKeys={[location.pathname.split('/')[2]]}
    >
      {menu.map((item) => (
        <Menu.Item
          key={item.pathName}
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
