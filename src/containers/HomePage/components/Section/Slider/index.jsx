import React from 'react';
import './Slider.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from '../../../../../components/Container/Container.styles';
import Titles from '../../../../../components/Title';
import { slider } from './slider.storage';

function HeroSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    cssEase: 'linear',
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className='ft-slick__dots--custom'>
        <div className='loading' />
      </div>
    ),
  };
  return (
    <section className='section__hero'>
      <Container>
        <Titles title=' Ve chung toi' />
        <Slider {...settings}>
          {slider.map((item) => (
            <div key={item.id}>
              <img className='slider__image' src={item.image} alt='' />
              <div className='slider__content'>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
}

export default HeroSlider;
