import { Pagination, Spin } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Titles from '../../../components/Title';
import * as actions from '../../../store/actions';

const pageSize = 10;
class TableManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handBookArray: [],
      current: 1,
      loading: true,
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
        loading: false,
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
        <Titles title={<FormattedMessage id='admin.manage-handbook.table' />} />
        <div className='users-table'>
          <table id='customers' style={{ position: 'relative' }}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Options</th>
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
            )}
          </table>
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.handleChangePageNumber}
          pageSize={pageSize}
          total={handBookArray.length}
          style={{ marginTop: '20px', textAlign: 'end' }}
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
