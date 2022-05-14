import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '../../../../../components/Container/Container.styles';
import Title from '../../../../../components/Title';
// import { FormattedMessage } from 'react-intl';

// import '../HomePage.scss';

class About extends Component {
  render() {
    return (
      <section className='section-about'>
        <Container>
          <Title title={'Blog'} />
          <div className='section-about-item'>
            <div className='section-about-item-video'>
              <iframe
                src='https://www.youtube.com/embed/x9WQdYJRDhI'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
            <div className='section-about-item-info'>
              <p>
                Mỗi người dân hãy là một chiến sĩ trong công cuộc chống dịch,
                Việt Nam sẽ chiến thắng đại dịch.
              </p>
            </div>
          </div>
        </Container>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
