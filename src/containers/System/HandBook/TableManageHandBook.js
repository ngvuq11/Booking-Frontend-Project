import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { Pagination } from 'antd';

import './TableManageHandBook.scss';

const pageSize = 10;
class TableManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handBookArray: [],
      current: 1,
    };
  }

  componentDidMount() {
    this.props.fetchAllBlogs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allBlogs !== this.props.allBlogs) {
      this.setState({
        handBookArray: this.props.allBlogs,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }

  handleDeleteHandBook = (handBook) => {
    this.props.deleteHandBook(handBook.id);
  };

  handleEditHandBook = (handBook) => {
    this.props.handleEditHandBook(handBook);
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
    let { handBookArray } = this.state;

    return (
      <div className='user-container'>
        <h1 className='title-user'>TABLE HAND BOOK</h1>
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
              {handBookArray &&
                handBookArray.length > 0 &&
                handBookArray.map(
                  (item, index) =>
                    index >= this.state.minIndex &&
                    index < this.state.maxIndex && (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          <button
                            className='btn-edit'
                            onClick={() => this.handleEditHandBook(item)}
                          >
                            <i className='fas fa-pencil-alt'></i>
                          </button>
                          <button
                            className='btn-delete'
                            onClick={() => this.handleDeleteHandBook(item)}
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
          total={handBookArray.length}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allBlogs: state.admin.allBlogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBlogs: () => dispatch(actions.fetchAllBlogs()),
    deleteHandBook: (id) => dispatch(actions.deleteHandBook(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageHandBook);
