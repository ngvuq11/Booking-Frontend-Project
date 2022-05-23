import { Pagination, Spin } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Titles from '../../../components/Title';
import * as actions from '../../../store/actions';

const pageSize = 15;
class TableManagePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentArray: [],
      current: 1,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.fetchAllPayment();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allPayments !== this.props.allPayments) {
      this.setState({
        paymentArray: this.props.allPayments,
        minIndex: 0,
        maxIndex: pageSize,
        loading: false,
      });
    }
  }

  handleChangePageNumber = (page) => {
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  render() {
    let { paymentArray } = this.state;

    return (
      <div className='user-container'>
        <Titles title='Table Manage Payment' />
        <div className='users-table'>
          <table id='customers' style={{ position: 'relative' }}>
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
                  top: '80px',
                  left: '50%',
                  transform: 'translateX( -50%)',
                }}
              />
            ) : (
              <tbody>
                {paymentArray &&
                  paymentArray.length > 0 &&
                  paymentArray.map(
                    (item, index) =>
                      index >= this.state.minIndex &&
                      index < this.state.maxIndex && (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.paymentId}</td>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.value}</td>
                          <td>{item.currency_code}</td>
                          <td>{item.timeType}</td>
                        </tr>
                      )
                  )}
              </tbody>
            )}
          </table>
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.handleChangePageNumber}
          pageSize={pageSize}
          total={paymentArray.length}
          style={{ marginTop: '30px', textAlign: 'end' }}
        />
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
