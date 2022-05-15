import { Component } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import {
  getMedicalRecordForDoctor,
  getProfileDoctor,
} from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

// import './DashBoardDoctor.scss';

class DashBoardDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataPatient: [],
      price: '',
      newDataPatient: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
    this.getDataPrice();
  }

  getDataPrice = async () => {
    let { user } = this.props;
    let id = user.id;
    let res = await getProfileDoctor(id);

    if (res && res.errCode === 0) {
      this.setState({
        price: res.data.Doctor_infor.priceIdData,
      });
    }
  };

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

  render() {
    let { dataPatient, newDataPatient, price } = this.state;
    let { language } = this.props;

    let priceData = language === LANGUAGES.VI ? price.valueVi : price.valueEn;

    // filter email
    newDataPatient = dataPatient
      .map((e) => e['email'])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter((e) => dataPatient[e])
      .map((e) => dataPatient[e]);

    return (
      <div className='manage-dashboard'>
        <div className='dashboard-top'>
          <div className='dashboard-top-left'>
            Patient:
            {newDataPatient.length}
            Total money:
            <NumberFormat
              value={newDataPatient.length * priceData}
              displayType={'text'}
              thousandSeparator={true}
            />
          </div>
          <div className='dashboard-top-right'></div>
        </div>
        <div className='dashboard-bottom'></div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardDoctor);
