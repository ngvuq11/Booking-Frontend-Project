import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import DatePicker from '../../../../components/Input/DatePicker';
import Titles from '../../../../components/Title/index';
import {
  getDetailInforDoctor,
  postBookAppointment,
  postPaymentPatient,
} from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import ProfileDoctor from '../ProfileDoctor/index';
import './BookingModal.scss';

const { TextArea } = Input;
const { Title } = Typography;

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      reason: '',
      genders: '',
      address: '',
      fullName: '',
      birthday: '',
      doctorId: '',
      timeType: '',
      phoneNumber: '',
      selectedGenders: '',
      isLoading: false,
      detailDoctor: [],
      isShowBtnPayment: false,
      unit: 0,
    };
  }

  async componentDidMount() {
    await this.props.getGenders();
    let id = this.props.doctorIdFromParent;
    let res = await getDetailInforDoctor(id);
    this.setState({
      detailDoctor: res.data,
    });
  }
  handleRenderPayment = () => {
    this.setState({
      unit: 2,
    });
    let { detailDoctor } = this.state;
    let price = detailDoctor?.Doctor_infor?.priceIdData?.valueEn;

    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Cool looking table',
                amount: {
                  currency_code: 'USD',
                  value: +price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order && order.status === 'COMPLETED') {
            this.handlePayment(order);
          }
        },
        onError: (err) => {
          console.log(err);
        },
        style: {
          layout: 'horizontal',
        },
      })
      .render('.payment-root');
  };

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
      this.setState({
        genders: this.buildGenders(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildGenders(this.props.genders),
      });
    }

    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handlePayment = async (order) => {
    let { dataTime, language } = this.props;

    let doctorId = dataTime.doctorId;
    let timeType = dataTime.timeType;
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(dataTime);
    let doctorName = this.buildDoctorName(dataTime);

    let res = await postPaymentPatient({
      birthDay: date,
      doctorId: doctorId,
      timeType: timeType,
      language: language,
      timeString: timeString,
      doctorName: doctorName,
      email: this.state.email,
      reason: this.state.reason,
      address: this.state.address,
      fullName: this.state.fullName,
      date: this.props.dataTime.date,
      phoneNumber: this.state.phoneNumber,
      selectedGenders: this.state.selectedGenders.value,

      value: order.purchase_units[0].amount.value,
      paymentId: order.purchase_units[0].payments.captures[0].id,
      email_address: order.purchase_units[0].payee.email_address,
      currency_code: order.purchase_units[0].amount.currency_code,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
      });
      toast.success('Booking a new appointment success !');
      this.props.closeBookingModal();
    } else {
      this.setState({
        isLoading: false,
      });
      toast.error('Booking a new appointment error !');
    }
  };

  buildGenders = (data) => {
    let { language } = this.props;
    let result = [];

    if (data && data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((item, index) => {
        let objoect = {};
        objoect.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        objoect.value = item.keymap;
        result.push(objoect);
      });
    }
    return result;
  };

  handleOnChangeInput = (event, id) => {
    let input = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = input;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnChangeSelect = (selectedOption) => {
    this.setState({
      selectedGenders: selectedOption,
    });
  };

  handleConfirmBooking = async () => {
    this.setState({
      isLoading: true,
    });

    let date = new Date(this.state.birthday).getTime();

    let timeString = this.buildTimeBooking(this.props.dataTime);

    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthDay: date,
      doctorId: this.state.doctorId,
      selectedGenders: this.state.selectedGenders.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
      });
      toast.success('Booking a new appointment success !');
      this.props.closeBookingModal();
    } else {
      this.setState({
        isLoading: false,
      });
      toast.error('Booking a new appointment error !');
      this.props.closeBookingModal();
    }
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('dddd - MM/DD/YYYY');
      return `${time} - ${date}`;
    }
    return '';
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorIdData.lastName} ${dataTime.doctorIdData.firstName}`
          : `${dataTime.doctorIdData.firstName} ${dataTime.doctorIdData.lastName}`;
      return name;
    }
    return '';
  };
  handChangeCheckbox = (event) => {
    let { checked } = event.target;
    console.log('checked', checked);
    this.setState({
      isShowBtnPayment: !this.state.isShowBtnPayment,
    });
    if (checked) {
      this.setState({
        isShowBtnPayment: true,
      });
      if (this.state.unit < 2) {
        this.handleRenderPayment();
      }
    } else {
      this.setState({
        isShowBtnPayment: false,
      });
    }
  };

  render() {
    let { isOpenModalBooking, closeBookingModal, dataTime } = this.props;
    let { isShowBtnPayment } = this.state;
    let doctorId = '';
    let doctorName = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorName =
        dataTime.doctorIdData.lastName + ' ' + dataTime.doctorIdData.firstName;
    }

    return (
      <>
        {this.state.isLoading ? (
          <Spin
            size='large'
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '9999',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <Modal
            visible={isOpenModalBooking}
            className={'booking-modal'}
            onCancel={closeBookingModal}
            footer={[]}
          >
            <Space direction='vertical' size={15} style={{ display: 'flex' }}>
              <Titles
                title={<FormattedMessage id='patient.booking-modal.title' />}
              />
              <Title level={3}>Bác sĩ: {doctorName} </Title>
              <ProfileDoctor
                doctorId={doctorId}
                doctorName={doctorName}
                isShowDescDoctor={false}
                dataTime={dataTime}
                isShowLinkDetail={false}
                isShowPrice={true}
                isShowCalendarDoctor={false}
                isShowDoctorModal={false}
              />
              <Row>
                <Form
                  name='basic'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  autoComplete='off'
                  id='myForm'
                  onFinish={() => this.handleConfirmBooking()}
                >
                  <Row gutter={[15, 15]}>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.email' />
                        }
                        name='email'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <Input
                          value={this.state.email}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, 'email')
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.phone-number' />
                        }
                        name='phoneNumber'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your phone number!',
                          },
                        ]}
                      >
                        <Input
                          value={this.state.phoneNumber}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, 'phoneNumber')
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[15, 15]}>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.full-name' />
                        }
                        name='fullName'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your full name!',
                          },
                        ]}
                      >
                        <Input
                          value={this.state.fullName}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, 'fullName')
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.address' />
                        }
                        name='address'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your address!',
                          },
                        ]}
                      >
                        <Input
                          value={this.state.address}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, 'address')
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[15, 15]}>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.date-of-birth' />
                        }
                        name='birtday'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your birtday!',
                          },
                        ]}
                      >
                        <DatePicker
                          onChange={this.handleOnChangeDatePicker}
                          value={this.state.birthday}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.gender' />
                        }
                        name='gender'
                        rules={[
                          {
                            required: true,
                            message: 'Please choose your gender!',
                          },
                        ]}
                      >
                        <Select
                          value={this.state.selectedGenders}
                          onChange={this.handleOnChangeSelect}
                          options={this.state.genders}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        label={
                          <FormattedMessage id='patient.booking-modal.reason' />
                        }
                        name='reason'
                        rules={[
                          {
                            required: true,
                            message: 'Please input your reason!',
                          },
                        ]}
                        className='reason-booking'
                      >
                        <TextArea
                          rows={4}
                          className='form-control'
                          value={this.state.reason}
                          onChange={(event) =>
                            this.handleOnChangeInput(event, 'reason')
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[20, 20]}>
                    <Col span={24}>
                      <Checkbox onChange={(ev) => this.handChangeCheckbox(ev)}>
                        Thanh toán bằng thẻ
                      </Checkbox>
                    </Col>
                    <Col span={24}>
                      <div
                        className={
                          this.state.isShowBtnPayment
                            ? 'payment-root '
                            : 'payment-root active'
                        }
                      ></div>
                    </Col>
                  </Row>
                  <Row gutter={[20, 20]} style={{ marginTop: '20px' }}>
                    {isShowBtnPayment ? (
                      <Col span={3} offset={21}>
                        <Button type='danger' ghost onClick={closeBookingModal}>
                          Cancel
                        </Button>
                      </Col>
                    ) : (
                      <>
                        <Col span={3} offset={18}>
                          <Button
                            type='danger'
                            ghost
                            onClick={closeBookingModal}
                          >
                            Cancel
                          </Button>
                        </Col>
                        <Col span={3}>
                          <Button type='primary' htmlType='submit'>
                            Confirm
                          </Button>
                        </Col>
                      </>
                    )}
                  </Row>
                </Form>
              </Row>
            </Space>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
    fetchDetailInforDoctor: (id) =>
      dispatch(actions.fetchDetailInforDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
