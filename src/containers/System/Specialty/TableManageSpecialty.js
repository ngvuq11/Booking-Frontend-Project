import { Pagination, Spin } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import * as actions from '../../../store/actions';

import './TableManageSpecialty.scss';

const pageSize = 10;
class TableManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specialtyArray: [],
      current: 1,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.fetchAllSpecialty();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allSpecialties !== this.props.allSpecialties) {
      this.setState({
        specialtyArray: this.props.allSpecialties,
        minIndex: 0,
        maxIndex: pageSize,
        loading: false,
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
      <Section className='user-container'>
        <Titles
          title={<FormattedMessage id='admin.manage-specialty.table' />}
        />
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
            )}
          </table>
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.handleChangePageNumber}
          pageSize={pageSize}
          total={listSpecialty.length}
          style={{ marginTop: '20px', textAlign: 'end' }}
        />
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allSpecialties: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
    deleteSpecialty: (id) => dispatch(actions.deleteSpecialty(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableManageSpecialty);
