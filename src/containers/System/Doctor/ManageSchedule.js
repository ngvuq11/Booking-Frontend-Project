import { Button, Space, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import { saveBulkScheduleDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import './ManageSchedule.scss';

const { Title } = Typography;
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      rangeTime: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({
          ...item,
          isActive: false,
        }));
      }

      this.setState({
        rangeTime: data,
        loading: false,
      });
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      date: date[0],
    });
  };

  handleOnClickActive = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isActive = !item.isActive;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, date } = this.state;
    let { user } = this.props;
    let result = [];

    if (!date) {
      toast.error('Invalid date !');
      return;
    }

    let formatedDate = new Date(date).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isActive === true);
      if (selectedTime && selectedTime.length > 0) {
        // eslint-disable-next-line array-callback-return
        selectedTime.map((time) => {
          let object = {};
          object.doctorId = user.id;
          object.date = formatedDate;
          object.timeType = time.keymap;
          result.push(object);
        });
      } else {
        toast.error('Invalid selected time !');
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: user.id,
      formatedDate: formatedDate,
    });

    if (res && res.errCode === 0) {
      toast.success('Success save schedule doctor !');
    } else {
      toast.error('Error save schedule doctor !');
    }
  };

  render() {
    let { rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <>
        {this.state.loading ? (
          <Spin
            tip='Plese wait...'
            size='small'
            style={{
              width: '100%',
              display: 'flex',
              gap: '20px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ) : (
          <Section className='manage-schedule'>
            <Titles title={<FormattedMessage id='manage-schedule.title' />} />
            <Space
              direction='vertical'
              style={{ display: 'flex', margin: '0 auto', maxWidth: '824px' }}
            >
              <Title level={3}>
                <FormattedMessage id='manage-schedule.choose-date' />
              </Title>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className='form-control doctor-date'
                value={this.state.date}
                minDate={yesterday}
                style={{ width: '350px', padding: '20px', fontSize: '14px' }}
              />

              <Space direction='vertical'>
                <Title level={3}>Chọn khung giờ</Title>
                <Space wrap style={{ width: '824px' }}>
                  {rangeTime &&
                    rangeTime.length > 0 &&
                    rangeTime.map((item, index) => {
                      return (
                        <button
                          className={
                            item.isActive
                              ? 'choose-time-item active'
                              : 'choose-time-item'
                          }
                          key={index}
                          onClick={() => this.handleOnClickActive(item)}
                        >
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </button>
                      );
                    })}
                </Space>
              </Space>
              <Button
                type='primary'
                shape='round'
                size='large'
                onClick={() => this.handleSaveSchedule()}
                style={{ marginTop: '30px' }}
              >
                <FormattedMessage id='manage-schedule.btn-save' />
              </Button>
            </Space>
          </Section>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    // allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
