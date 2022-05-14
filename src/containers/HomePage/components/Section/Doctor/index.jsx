import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../../components/Container/Container.styles';
import DoctorCard from '../../../../../components/DoctorCard/index';
import Titles from '../../../../../components/Title';
import * as actions from '../../../../../store/actions';
import { LANGUAGES } from '../../../../../utils';
import './Doctor.scss';
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
      <>
        <section className='section-container section-doctor'>
          <Container>
            <div className='section-content'>
              <Titles
                title={<FormattedMessage id='home-page.outstanding-doctor' />}
              />
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
            </div>
          </Container>
        </section>
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
