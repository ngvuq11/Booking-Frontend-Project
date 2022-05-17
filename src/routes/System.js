import React, { Component } from 'react';
import { connect } from 'react-redux';
// import UserManage from '../containers/System/UserManage';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import DashBoard from '../containers/System/Admin/DashBoard';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import ManageHandBook from '../containers/System/HandBook/ManageHandBook';

import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';

import ManagePayment from '../containers/System/Payment/ManagePayment';


class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;

    return (
      <>
        {isLoggedIn && (
          <Header>
            <Switch>
              <Route path='/system/dashboard' component={DashBoard} />
              {/* <Route path="/system/user-manage" component={UserManage} /> */}
              <Route path='/system/manage-user' component={UserRedux} />
              <Route path='/system/manage-doctor' component={ManageDoctor} />
              <Route
                path='/system/manage-specialty'
                component={ManageSpecialty}
              />
              <Route path='/system/manage-clinic' component={ManageClinic} />
              <Route
                path='/system/manage-handbook'
                component={ManageHandBook}
              />
              <Route path='/system/manage-payment' component={ManagePayment} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
