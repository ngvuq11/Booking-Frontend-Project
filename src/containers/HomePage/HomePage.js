import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import HomeHeader from '../../components/Header/HomeHeader';
import Maps from '../../components/Maps';
import About from './components/About/index';
import Banner from './components/Banner';
import Clinic from './components/Section/Clinic/index';
import Doctor from './components/Section/Doctor/index';
import Experience from './components/Section/Experience';
import Footer from './components/Section/Footer/index';
import Specialty from './components/Section/Specialty/index';
import './HomePage.scss';

function HomePage(props) {
  const [isLoading, setIsLoading] = useState(false);
  setTimeout(() => {
    setIsLoading(true);
  }, 1000);
  return (
    <>
      {isLoading ? (
        <>
          <HomeHeader />
          <Banner />
          <Specialty />
          <Clinic />
          <Experience />
          <Doctor />
          <About />
          <Maps address='254 Nguyen Van Linh' />
          <Footer />
        </>
      ) : (
        <Spin
          tip='Plese wait...'
          size='large'
          style={{
            width: '100vw',
            height: '100vh',
            maxHeight: 'unset',
            display: 'flex',
            gap: '20px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
