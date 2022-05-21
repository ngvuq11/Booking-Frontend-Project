import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './TableManagePayment.scss';

class TableManagePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentArray: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllPayment();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allPayments !== this.props.allPayments) {
      this.setState({
        paymentArray: this.props.allPayments,
      });
    }
  }
  render() {
    let { paymentArray } = this.state;

    return (
      <div className='user-container'>
        <h1 className='title-user'>TABLE PAYMENTS</h1>
        <div className='users-table'>
          <table id='customers'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Payment ID</th>
                <th>Full name</th>
                <th>Email</th>
                <th>Value</th>
                <th>Currency</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {paymentArray &&
                paymentArray.length > 0 &&
                paymentArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.paymentId}</td>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.value}</td>
                      <td>{item.currency_code}</td>
                      <td>{item.timeType}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allPayments: state.admin.allPayments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllPayment: () => dispatch(actions.fetchAllPayment()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagePayment);
