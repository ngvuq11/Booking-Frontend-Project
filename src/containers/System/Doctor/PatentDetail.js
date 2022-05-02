import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Modal } from 'reactstrap';
// import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

import './PatientDetail.scss';

class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false
    };
  }

  async componentDidMount() {
  }

  async componentDidUpdate(prevProps, prevState) {
  }

  render() {
    let { isOpenModal, closeDetailPatientModal, detailPatient } = this.props;
    let patientInfor = detailPatient.patientInfor;
    console.log(patientInfor);
    console.log(this.props);
    return (
      <Modal isOpen={isOpenModal} size='md' centered className={'remedy-modal'}>
        <div className='modal-header'>
          <h3 className='modal-header-title'>Lịch sử khám bệnh</h3>
          <span className='modal-header-btn' onClick={closeDetailPatientModal}>
            x
          </span>
        </div>
        <div className='modal-body'>
          <div className='row'>
            {
              detailPatient && patientInfor ?
              <div>
                <span>{detailPatient.email}</span>
                <span>{patientInfor.fullName}</span>
                <span>{patientInfor.phoneNumber}</span>
                <span>{patientInfor.address}</span>
                <span>{patientInfor.gender}</span>
                <span>{detailPatient.diagnose}</span>
                <span>{detailPatient.createdAt}</span>
              </div> : <div>No data!</div>
            }
            
          </div>
        </div>
        <div className='modal-footer'>
          <button className='btn-cancel' onClick={closeDetailPatientModal}>
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
