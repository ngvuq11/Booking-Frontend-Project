import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';

import './TableManageUser.scss';
import { Pagination } from 'antd';
import Titles from '../../../components/Title';
import { Section } from '../../../components/Secction/Section.styleds';

const pageSize = 10;
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArray: [],
      current: 1,
    };
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        userArray: this.props.users,
        minIndex: 0,
        maxIndex: pageSize,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUser(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
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
    let listUsers = this.state.userArray;
    return (
      <Section>
        <Titles title={<FormattedMessage id='manage-user.user-list' />} />
        <div className='users-table'>
          <table id='customers'>
            <thead>
              <tr>
                <th>Email</th>
                <th>Last name</th>
                <th>First name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map(
                  (item, index) =>
                    index >= this.state.minIndex &&
                    index < this.state.maxIndex && (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className='btn-edit'
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className='fas fa-pencil-alt'></i>
                          </button>
                          <button
                            className='btn-delete'
                            onClick={() => this.handleDeleteUser(item)}
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
          total={listUsers.length}
          style={{ marginTop: '20px', textAlign: 'end' }}
        />
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actions.fetchAllUsersStart()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
