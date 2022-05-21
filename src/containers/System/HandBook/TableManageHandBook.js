import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import './TableManageHandBook.scss';

class TableManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handBookArray: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllHandBook();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allHandBooks !== this.props.allHandBooks) {
      this.setState({
        handBookArray: this.props.allHandBooks,
      });
    }
  }

  handleDeleteHandBook = (handBook) => {
    this.props.deleteHandBook(handBook.id);
  };

  handleEditHandBook = (handBook) => {
    this.props.handleEditHandBook(handBook);
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
                handBookArray.map((item, index) => {
                  return (
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
    allHandBooks: state.admin.allHandBooks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllHandBook: () => dispatch(actions.fetchAllHandBook()),
    deleteHandBook: (id) => dispatch(actions.deleteHandBook(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageHandBook);
