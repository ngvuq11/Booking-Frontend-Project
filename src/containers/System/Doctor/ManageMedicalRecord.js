import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PatientDetail from './PatentDetail';
import { FormattedMessage } from 'react-intl';
import LoadingOverlay from 'react-loading-overlay';
import DatePicker from '../../../components/Input/DatePicker';
import { getMedicalRecordForDoctor } from '../../../services/userService';

import './ManageMedicalRecord.scss';

class ManageMedicalRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPatient: [],
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

  handleShowDetailPatientModal = (item) => {
    this.setState({
      isOpenModal: true,
      detailPatient: item,
    });
  };

  handleCloseDetailPatientModal = () => {
    this.setState({
      isOpenModal: false,
      detailPatient: '',
    });
  };

  render() {
    let { dataPatient, isOpenModal, detailPatient } = this.state;
    return (
      <>
        <LoadingOverlay active={this.state.isLoading} spinner text='Loading...'>
          <div className='manage-patient'>
            <h2 className='title'>
              <FormattedMessage id='menu.doctor.manage-medical-record' />
            </h2>

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
                        <th>diagnose</th>
                        <th>Actions</th>
                      </tr>
                      {dataPatient && dataPatient.length > 0 ? (
                        dataPatient.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.email}</td>
                              <td>{item.diagnose}</td>
                              <td className='actions'>
                                <div className='btn-container'>
                                  <button
                                    className='btn btn-confirm'
                                    onClick={() =>
                                      this.handleShowDetailPatientModal(item)
                                    }
                                  >
                                    <FormattedMessage id='menu.doctor.medical-record.see-more' />
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
          </div>

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
