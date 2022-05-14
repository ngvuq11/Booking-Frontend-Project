import { Button, Space, Typography } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../../components/Container/Container.styles';
import DoctorCard from '../../../../../components/DoctorCard/index';
import { Section } from '../../../../../components/Secction/Section.styleds';
import Titles from '../../../../../components/Title';
import * as actions from '../../../../../store/actions';
import { LANGUAGES } from '../../../../../utils';
import './Doctor.scss';

const { Title } = Typography;
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrDoctors: this.props.topDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
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
            <Title level={3} className='home__list--doctor--title title__green'>
              ĐỘI NGŨ CHUYÊN NGHIỆP
            </Title>
            <Title level={3} className='home__list--doctor--title'>
              CÁC BÁC SĨ CỦA PHÒNG KHÁM ĐA KHOA THÀNH CÔNG
            </Title>
            <div className='home__list--doctor'>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, 'base64').toString(
                      'binary'
                    );
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
              }}
            >
              <Button type='danger' ghost>
                Xem thêm
              </Button>
            </div>
          </Space>
        </Container>
      </Section>
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
