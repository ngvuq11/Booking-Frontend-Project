import { Component } from 'react';
import { connect } from 'react-redux';
import statusCard from '../../../assets/JsonData/dashboard.json';
import * as actions from '../../../store/actions';
import './DashBoard.scss';
import StatusCard from './StatusCard';

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataClinics: [],
      dataDoctors: [],
      dataPayment: [],
      dataPatients: [],
      dataHandBooks: [],
      dataSpecialties: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllClinic();
    this.props.fetchAllPatient();
    this.props.fetchAllPayment();
    this.props.fetchAllBlogs();
    this.props.fetchAllSpecialty();
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let {
      dataClinics,
      dataDoctors,
      dataSpecialties,
      dataPatients,
      dataHandBooks,
    } = this.state;
    let {
      allDoctors,
      allClinics,
      allPayments,
      allPatients,
      allSpecialties,
      allBlogs,
    } = this.props;

    dataClinics = allClinics.length;
    dataDoctors = allDoctors.length;
    dataSpecialties = allSpecialties.length;
    dataHandBooks = allBlogs.length;
    dataPatients = allPatients.length;

    let newMoney = 0;
    allPayments.map((money) => {
      return (newMoney += +money.value);
    });

    let totalMoney = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(newMoney);

    const array = [
      dataDoctors,
      dataPatients,
      dataClinics,
      dataSpecialties,
      dataHandBooks,
      totalMoney,
    ];

    for (let i = 0; i < statusCard.length; i++) {
      statusCard[i].count = array[i];
    }

    return (
      <div className='manage-dashboard'>
        <div className='dashboard-top'>
          <div className='dashboard-top-left'>
            {statusCard.map((item, index) => (
              <StatusCard
                key={index + 1}
                name={item.name}
                icon={item.icon}
                count={item.count}
              />
            ))}
          </div>
          <div className='dashboard-top-right'></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allPayments: state.admin.allPayments,
    allClinics: state.admin.allClinics,
    allPatients: state.admin.allPatients,
    allBlogs: state.admin.allBlogs,
    allSpecialties: state.admin.allSpecialties,
    allRequireDoctorInfor: state.admin.allRequireDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
    fetchAllPatient: () => dispatch(actions.fetchAllPatient()),
    fetchAllPayment: () => dispatch(actions.fetchAllPayment()),
    fetchAllBlogs: () => dispatch(actions.fetchAllBlogs()),
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
