import React from 'react';
import './Slider.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from '../../../../components/Container/Container.styles';

function HeroSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
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
        <Slider {...settings}>
          <div>
            <img
              className='slider__image'
              src='https://images.unsplash.com/photo-1517770413964-df8ca61194a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt=''
            />
            <div className='slider__content'>
              <p>
                I cannot fix on the hour, or the spot, or the look or the words,
                which laid the foundation. It is too long ago. I was in the
                middle before I knew that I had begun.
              </p>
            </div>
          </div>
          <div>
            <div className='slider__content'>
              <p>
                There is a stubbornness about me that never can bear to be
                frightened at the will of others. My courage always rises at
                every attempt to intimidate me.
              </p>
            </div>
            <img
              className='slider__image'
              src='https://images.unsplash.com/photo-1468779036391-52341f60b55d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1668&q=80'
              alt=''
            />
          </div>
          <div>
            <img
              className='slider__image'
              src='https://images.unsplash.com/photo-1637681068516-2b22116e68cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt=''
            />
            <div className='slider__content'>
              <p>
                I am the happiest creature in the world. Perhaps other people
                have said so before, but not one with such justice. I am happier
                even than Jane; she only smiles, I laugh.
              </p>
            </div>
          </div>
        </Slider>
      </Container>
    </section>
  );
}

export default HeroSlider;
