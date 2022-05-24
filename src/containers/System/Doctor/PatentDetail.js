import React, { Component } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import { Modal } from 'reactstrap';
import './PatientDetail.scss';

class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { isOpenModal, closeDetailPatientModal, detailPatient } = this.props;

    return (
      <Modal isOpen={isOpenModal} size='md' centered className={'remedy-modal'}>
        <div className='modal-header'>
          <h3 className='modal-header-title'>Lịch sử khám bệnh</h3>
          <span className='modal-header-btn' onClick={closeDetailPatientModal}>
            x
          </span>
        </div>
        <div
          className='modal-body'
          style={{
            width: '100%',
            overflowY: detailPatient.length > 1 ? 'scroll' : 'hidden',
          }}
        >
          <div className='modal-total'>
            Tổng số lần khám: {detailPatient.length}
          </div>
          <div className='row'>
            {detailPatient ? (
              detailPatient.map((item, index) => {
                return (
                  <div
                    className='detail-content'
                    // style={{
                    //   paddingLeft:15,
                    //   width:"100%",
                    //   borderTop: index >= 1 ? '1px solid #111' : 'none',
                    // }}
                    key={index}
                  >
                    <span
                      style={{
                        width: '100%',
                        borderTop: index >= 1 ? '1px solid #111' : 'none',
                      }}
                      className='first-content'
                    >
                      Lần khám thứ: {index + 1}
                    </span>
                    <span>Email: {item.email}</span>
                    <span>Full name: {item.patientInfor.fullName}</span>
                    <span>Phone number: {item.patientInfor.phoneNumber}</span>
                    <span>Address: {item.patientInfor.address}</span>
                    <span>
                      Gender:{' '}
                      {item.patientInfor.gender === 'M' ? 'Male' : 'Famale'}
                    </span>
                    <span>Diagnose: {item.diagnose}</span>
                    <span>Clinic hours: {item.createdAt.slice(12, 19)}</span>
                    <span>
                      Day of the examination: {item.createdAt.slice(0, 10)}
                    </span>
                  </div>
                );
              })
            ) : (
              <div>No data!</div>
            )}
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
