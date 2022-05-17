import React from 'react';
import PropTypes from 'prop-types';
import { TopbarWrapper } from './DashboardHeader.styled';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

DashboardHeader.propTypes = {};
const { Header } = Layout;
const styling = {
  background: '#eee',
  position: 'fixed',
  width: '100%',
  height: 70,
};

function DashboardHeader(props) {
  const isCollapsed = collapsed && !openDrawer;

  const { collapsed, openDrawer } = useSelector((state) => state.App);

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className='isoLeft'>
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: '#fff' }}
            // onClick={handleToggle}
          />
        </div>

        <div className='isoRight'>
          <li className='isoUser'>
            {/* <TopbarUser /> */}
            {/* onClick={() => setSelectedItem('user')} */}
          </li>
        </div>
      </Header>
    </TopbarWrapper>
  );
}

export default DashboardHeader;
