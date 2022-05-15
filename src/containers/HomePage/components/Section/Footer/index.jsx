import {
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '../../../../../components/Container/Container.styles';
import Logo from '../../../../../components/Logo';
import CoppyRight from '../CoppyRight';
import { Link } from 'react-router-dom';

import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <>
        <footer className='footer'>
          <Container>
            <div className='footer__top'>
              <Logo />
              <div className='footer__inner'>
                <Button
                  className='btn btn__dot m-r-20 btn__help btn__white'
                  title='Help'
                />
                <Button className='btn btn__faq btn__purple' title="FAQ's" />
              </div>
            </div>
            <div className='footer__category'>
              <div className='category__location'>
                <p>Hai Chau, Da Nang, Viet Nam, Asia.</p>
                <div className='category__more'>
                  <Button className='btn btn__white btn__more' title='More +' />
                </div>
                <div className='category--social'>
                  <Link to='!#'>
                    <FacebookOutlined />
                  </Link>
                  <Link to='!#'>
                    <TwitterOutlined />
                  </Link>
                  <Link to='!#'>
                    <YoutubeOutlined />
                  </Link>
                </div>
              </div>
              <div className='category__list'>
                <div className='category__list--col'>
                  <ul>
                    <li>
                      <Link to='!#'>New in</Link>
                    </li>
                    <li>
                      <Link to='!#'>Collections</Link>
                    </li>
                    <li>
                      <Link to='!#'>Author</Link>
                    </li>
                    <li>
                      <Link to='!#'>Community</Link>
                    </li>
                  </ul>
                </div>
                <div className='category__list--col'>
                  <ul>
                    <li>
                      <Link to='!#'>Products</Link>
                    </li>
                    <li>
                      <Link to='!#'>Gift Vouchers</Link>
                    </li>
                    <li>
                      <Link to='!#'>Brand</Link>
                    </li>
                    <li>
                      <Link to='!#'>Stories</Link>
                    </li>
                  </ul>
                </div>
                <div className='category__list--col'>
                  <ul>
                    <li>
                      <Link to='!#'>Track Orders</Link>
                    </li>
                    <li>
                      <Link to='!#'>Delivery & Returns</Link>
                    </li>
                    <li>
                      <Link to='!#'>Sale</Link>
                    </li>
                    <li>
                      <Link to='!#'>Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='footer__bottom'>
              <div className='footer__bottom--coppyright'>
                © 2022 - Khoa Luan - Booking
              </div>
              <div className='footer__bottom--policy'>
                <ul>
                  <li>
                    <Link to='!#'>Privacy policy</Link>
                  </li>
                  <li>
                    <Link to='!#'>Terms of use</Link>
                  </li>
                  <li>
                    <Link to='!#'>Cookies</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </footer>
        <CoppyRight />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
