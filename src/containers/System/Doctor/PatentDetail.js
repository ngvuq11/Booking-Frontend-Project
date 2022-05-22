import { Button, Modal, Space, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Titles from '../../../components/Title';
import './PatientDetail.scss';

const { Title } = Typography;
class PatientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
    };
  }
  handleCancel = () => {
    this.setState({
      isOpenModal: false,
    });
  };

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  render() {
    let { isOpenModal, closeDetailPatientModal, detailPatient } = this.props;

    return (
      <Modal
        title='Lịch sử khám bệnh'
        visible={isOpenModal}
        onCancel={closeDetailPatientModal}
        footer={[
          <Button key='back' onClick={closeDetailPatientModal}>
            Cancel
          </Button>,
        ]}
      >
        <Titles title={`Tổng số lần khám: ${detailPatient.length}`} />

        {detailPatient ? (
          detailPatient.map((item, index) => {
            return (
              <div className='history__patient' key={index}>
                <Title
                  level={4}
                  style={{
                    color: '#e76f51',
                    background: '#eee',
                    padding: '6px 10px',
                    borderRadius: '8px',
                  }}
                >
                  Lần khám thứ: {index + 1}
                </Title>
                <Space
                  direction='vertical'
                  size={5}
                  style={{ padding: '0 8px' }}
                >
                  <span>Email: {item.email}</span>
                  <span>Full name: {item.patientInfor.fullName}</span>
                  <span>Phone number: {item.patientInfor.phoneNumber}</span>
                  <span>Address: {item.patientInfor.address}</span>
                  <span>
                    Gender:
                    {item.patientInfor.gender === 'M' ? 'Male' : 'Famale'}
                  </span>
                  <span>Diagnose: {item.diagnose}</span>
                  <span>Clinic hours: {item.createdAt.slice(12, 19)}</span>
                  <span>
                    Day of the examination: {item.createdAt.slice(0, 10)}
                  </span>
                </Space>
              </div>
            );
          })
        ) : (
          <div>No data!</div>
        )}
      </Modal>

      // <Modal isOpen={isOpenModal} size='md' centered className={'remedy-modal'}>
      //   <div className='modal-header'>
      //     <h3 className='modal-header-title'>Lịch sử khám bệnh</h3>
      //     <span className='modal-header-btn' onClick={closeDetailPatientModal}>
      //       x
      //     </span>
      //   </div>
      //   <div className='modal-body'>
      //     <div>Tổng số lần khám: {detailPatient.length}</div>
      //     <div className='row'>
      //       {detailPatient ? (
      //         detailPatient.map((item, index) => {
      //           return (
      //             <Space direction='vertical' key={index}>
      //               <span>Lần khám thứ: {index + 1}</span>
      //               <span>Email: {item.email}</span>
      //               <span>Full name: {item.patientInfor.fullName}</span>
      //               <span>Phone number: {item.patientInfor.phoneNumber}</span>
      //               <span>Address: {item.patientInfor.address}</span>
      //               <span>
      //                 Gender:{' '}
      //                 {item.patientInfor.gender === 'M' ? 'Male' : 'Famale'}
      //               </span>
      //               <span>Diagnose: {item.diagnose}</span>
      //               <span>Clinic hours: {item.createdAt.slice(12, 19)}</span>
      //               <span>
      //                 Day of the examination: {item.createdAt.slice(0, 10)}
      //               </span>
      //             </Space>
      //           );
      //         })
      //       ) : (
      //         <div>No data!</div>
      //       )}
      //     </div>
      //   </div>
      //   <div className='modal-footer'>
      //     <button className='btn-cancel' onClick={closeDetailPatientModal}>
      //       Cancel
      //     </button>
      //   </div>
      // </Modal>
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
