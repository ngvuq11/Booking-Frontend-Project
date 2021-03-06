import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import {
  getMedicalRecordForDoctor,
  getPatientforDoctorById,
} from '../../../services/userService';
import PatientDetail from './PatentDetail';

class ManageMedicalRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPatient: [],
      newDataPatient: [],
      isLoading: false,
      detailPatient: '',
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let id = user.id;
    let res = await getMedicalRecordForDoctor(id);

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  handleShowDetailPatientModal = async (item) => {
    let id = item.patientId;
    let res = await getPatientforDoctorById(id);
    if (res && res.errCode === 0) {
      this.setState({
        isOpenModal: true,
        detailPatient: res.data,
      });
    }
  };

  handleCloseDetailPatientModal = () => {
    this.setState({
      isOpenModal: false,
      detailPatient: '',
    });
  };

  render() {
    let { dataPatient, isOpenModal, detailPatient, newDataPatient } =
      this.state;

    // filter email
    newDataPatient = dataPatient
      .map((e) => e['email'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => dataPatient[e])
      .map((e) => dataPatient[e]);

    return (
      <>
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text='Plese wait...'
        >
          <Section className='manage-patient'>
            <Titles
              title={
                <FormattedMessage id='menu.doctor.manage-medical-record' />
              }
            />

            <div className='manage-patient-body'>
              <div className='row'>
                <div className='col-12 form-group patient-list'>
                  <label>
                    <FormattedMessage id='menu.doctor.medical-record.list-medical-record' />
                  </label>
                  <table>
                    <tbody>
                      <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>Full name</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                      {newDataPatient && newDataPatient.length > 0 ? (
                        newDataPatient.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.patientInfor.email}</td>
                              <td>{item.patientInfor.fullName}</td>
                              <td>{item.patientInfor.phoneNumber}</td>
                              <td>{item.patientInfor.address}</td>
                              <td className='actions'>
                                <div className='btn-container'>
                                  <button
                                    className='btn btn-confirm'
                                    onClick={() =>
                                      this.handleShowDetailPatientModal(item)
                                    }
                                  >
                                    <FormattedMessage id='global.see-more' />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan='8'>No data...</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Section>

          <PatientDetail
            detailPatient={detailPatient}
            isOpenModal={isOpenModal}
            closeDetailPatientModal={this.handleCloseDetailPatientModal}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageMedicalRecord);
