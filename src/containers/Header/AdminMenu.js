import React from 'react';
import { BsFillCalendarDateFill, BsFillPersonFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';
import { Menu } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';

function AdminMenu(props) {
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
