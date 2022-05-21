import { Pagination } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './TableManageSpecialty.scss';

const pageSize = 10;
class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyArray: [],
      current: 1,
    };
  }

  componentDidMount() {
    this.props.fetchSpecialty();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        specialtyArray: this.props.data,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }

  handleDeleteSpecialty = (specialty) => {
    this.props.deleteSpecialty(specialty.id);
  };

  handleEditSpecialty = (specialty) => {
    this.props.handleEditSpecialty(specialty);
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
    let listSpecialty = this.state.specialtyArray;

    return (
      <div className='user-container'>
        <h1 className='title-user'>TABLE SPECIALTY</h1>
        <div className='users-table'>
          <table id='customers'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Options</th>
              </tr>
            </thead>

            <tbody>
              {listSpecialty.map(
                (item, index) =>
                  index >= this.state.minIndex &&
                  index < this.state.maxIndex && (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button
                          className='btn-edit'
                          onClick={() => this.handleEditSpecialty(item)}
                        >
                          <i className='fas fa-pencil-alt'></i>
                        </button>
                        <button
                          className='btn-delete'
                          onClick={() => this.handleDeleteSpecialty(item)}
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
          total={listSpecialty.length}
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
    fetchSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
    deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
