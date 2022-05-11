import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../components/Header/HomeHeader';

import Specialty from './components/Section/Specialty/index';
import Clinic from './components/Section/Clinic/index';
import Doctor from './components/Section/Doctor/index';
import About from './components/Section/About/index';
import CopyRight from './components/Section/CoppyRight/index';
import Footer from './components/Section/Footer/index';

// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import HeroSlider from './components/Section/Slider/index';

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 3,
    };

    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <HeroSlider />
        <Specialty settings={settings} />
        <Clinic settings={settings} />
        <Doctor settings={settings} />
        <About />
        <Footer />
        <CopyRight />
      </div>
    );
  }
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
