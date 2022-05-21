import { Pagination } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './TableManageClinic.scss';

const pageSize = 10;
class TableManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicArray: [],
      current: 1,
    };
  }

  componentDidMount() {
    this.props.fetchClinic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        clinicArray: this.props.data,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }

  handleDeleteClinic = (clinic) => {
    this.props.deleteClinic(clinic.id);
  };

  handleEditClinic = (clinic) => {
    this.props.handleEditClinic(clinic);
  };

  handleChangePageNumber = (page) => {
    console.log(page);
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  render() {
    let listClinic = this.state.clinicArray;

    return (
      <div className='user-container'>
        <h1 className='title-user'>TABLE SPECIALTY</h1>
        <div className='users-table'>
          <table id='customers'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Address</th>
                <th>Options</th>
              </tr>
            </thead>

            <tbody>
              {listClinic.map(
                (item, index) =>
                  index >= this.state.minIndex &&
                  index < this.state.maxIndex && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className='btn-edit'
                          onClick={() => this.handleEditClinic(item)}
                        >
                          <i className='fas fa-pencil-alt'></i>
                        </button>
                        <button
                          className='btn-delete'
                          onClick={() => this.handleDeleteClinic(item)}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.handleChangePageNumber}
          pageSize={pageSize}
          total={listClinic.length}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.admin.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinic: () => dispatch(actions.fetchAllClinicStart()),
    deleteClinic: (id) => dispatch(actions.deleteClinic(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
