import { Pagination, Spin } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import * as actions from '../../../store/actions';

import './TableManageClinic.scss';

const pageSize = 10;
class TableManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicArray: [],
      current: 1,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.fetchAllClinic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allClinics !== this.props.allClinics) {
      this.setState({
        clinicArray: this.props.allClinics,
        minIndex: 0,
        maxIndex: pageSize,
        loading: false,
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
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  render() {
    let listClinic = this.state.clinicArray;

    return (
      <Section className='user-container'>
        <Titles title={<FormattedMessage id='admin.manage-clinic.table' />} />
        <div className='users-table'>
          <table id='customers' style={{ position: 'relative' }}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Address</th>
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
            )}
          </table>
        </div>
        <Pagination
          current={this.state.current}
          onChange={this.handleChangePageNumber}
          pageSize={pageSize}
          total={listClinic.length}
          style={{ marginTop: '20px', textAlign: 'end' }}
        />
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allClinics: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinic: () => dispatch(actions.fetchAllClinic()),
    deleteClinic: (id) => dispatch(actions.deleteClinic(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
