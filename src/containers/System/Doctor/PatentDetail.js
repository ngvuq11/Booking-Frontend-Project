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
        title={<Titles title={`Tổng số lần khám: ${detailPatient.length}`} />}
        visible={isOpenModal}
        onCancel={closeDetailPatientModal}
        footer={[
          <Button type='danger' key='back' onClick={closeDetailPatientModal}>
            Cancel
          </Button>,
        ]}
        className='modal-patient-detail'
      >
        {/* <Titles title={`Tổng số lần khám: ${detailPatient.length}`} /> */}
        <div className='patient-detail'>
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
