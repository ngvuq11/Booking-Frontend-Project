import React from 'react';
import './Slider.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from '../../../../../components/Container/Container.styles';

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
              src='https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
              alt=''
            />
            <div className='slider__content'>
              <p>
                Người ta chỉ trích tôi vì có vẻ tôi đã bước ra khỏi lĩnh vực
                chuyên môn để không đứng đắn nhúng chân vào chính trị. Tôi muốn
                nói rằng tôi đã muộn màng nhận ra rằng sự chăm sóc hàng ngày,
                những ngôi trường tốt, bảo hiểm y tế, và sự giải giáp hạt nhân
                thậm chí là những vấn đề quan trọng của bác sĩ nhi khoa hơn là
                vắc xin bệnh sởi hay vitamin D. – Benjamin Spock
              </p>
            </div>
          </div>
          <div>
            <div className='slider__content'>
              <p>
                Bác sĩ phải làm việc mười tám tiếng một ngày và bảy ngày một
                tuần. Nếu bạn không thể an ủi bản thân trước điều này, hãy rời
                khỏi nghề thôi. – Martin H. Fischer
              </p>
            </div>
            <img
              className='slider__image'
              src='https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80'
              alt=''
            />
          </div>
          <div>
            <img
              className='slider__image'
              src='https://images.unsplash.com/photo-1579684453423-f84349ef60b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1191&q=80'
              alt=''
            />
            <div className='slider__content'>
              <p>
                Nếu y học phổ cập cho con người sự sáng suốt cũng như tri thức,
                đó sẽ là sự bảo vệ tốt nhất đối với những bác sĩ có kỹ thuật và
                được đào tạo tốt. – Rudolf Virchow
              </p>
            </div>
          </div>
        </Slider>
      </Container>
    </section>
  );
}

export default HeroSlider;
