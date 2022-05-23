import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import DashBoardDoctor from '../containers/System/Doctor/DashBoardDoctor';
import ManageMedicalRecord from '../containers/System/Doctor/ManageMedicalRecord';
import ManagePatient from '../containers/System/Doctor/ManagePatient';
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        {isLoggedIn && (
          <Header>
            <Switch>
              <Route
                path='/doctor/dashboard-doctor'
                component={DashBoardDoctor}
              />
              <Route
                path='/doctor/manage-schedule'
                component={ManageSchedule}
              />
              <Route path='/doctor/manage-patient' component={ManagePatient} />
              <Route
                path='/doctor/manage-medical-record'
                component={ManageMedicalRecord}
              />
            </Switch>
          </Header>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
