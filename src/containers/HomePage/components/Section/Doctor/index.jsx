import { Button, Space, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../../components/Container/Container.styles';
import DoctorCard from '../../../../../components/DoctorCard/index';
import { Section } from '../../../../../components/Secction/Section.styleds';
import * as actions from '../../../../../store/actions';
import { LANGUAGES } from '../../../../../utils';
import './Doctor.scss';

const { Title } = Typography;
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
        isLoading: true,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  handleViewAllDoctor = () => {
    if (this.props.history) {
      this.props.history.push('/list-doctor');
    }
  };

  render() {
    let { arrDoctors, isLoading } = this.state;
    let { language } = this.props;

    return (
      <>
        {isLoading ? (
          <Section className='section__home--doctor'>
            <Container>
              <Space
                direction='vertical'
                size={10}
                style={{ display: 'flex' }}
                className='home__doctor'
              >
                {/* <Titles
              title={<FormattedMessage id='home-page.outstanding-doctor' />}
            /> */}
                <Title
                  level={3}
                  className='home__list--doctor--title title__green'
                >
                  <FormattedMessage id='home-page.doctor.title' />
                </Title>
                <Title level={3} className='home__list--doctor--title'>
                  <FormattedMessage id='home-page.doctor.desc' />
                </Title>
                <div className='home__list--doctor'>
                  {arrDoctors &&
                    arrDoctors.length > 0 &&
                    arrDoctors.map((item, index) => {
                      let imageBase64 = '';
                      if (item.image) {
                        imageBase64 = Buffer.from(
                          item.image,
                          'base64'
                        ).toString('binary');
                      }
                      let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                      let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                      return (
                        <DoctorCard
                          key={index}
                          onClick={() => this.handleViewDetailDoctor(item)}
                          image={imageBase64}
                          name={language === LANGUAGES.VI ? nameVi : nameEn}
                        />
                      );
                    })}
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px',
                  }}
                >
                  <Button
                    type='danger'
                    ghost
                    onClick={() => this.handleViewAllDoctor()}
                  >
                    <FormattedMessage id='global.see-more' />
                  </Button>
                </div>
              </Space>
            </Container>
          </Section>
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
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
