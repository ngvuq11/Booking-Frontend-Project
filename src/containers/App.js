import { ConnectedRouter as Router } from 'connected-react-router';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../auth/authentication';
import CustomScrollbars from '../components/CustomScrollbar/CustomScrollbars';
import Covid19 from '../containers/HomePage/components/Covid19/Covid19';
import { history } from '../redux';
import Doctor from '../routes/Doctor';
import Home from '../routes/Home';
import System from '../routes/System';
import { path } from '../utils';
import Login from './Auth/Login';
import ListBlogs from './HomePage/components/Blogs/ListBlogs';
import ListClinic from './HomePage/components/Clinic/ListClinic';
import ListDoctor from './HomePage/components/Doctor/ListDoctor';
import ListSpecialty from './HomePage/components/Specialty/ListSpecialty';
import HomePage from './HomePage/HomePage.js';
import DetailBlog from './Patient/Blog/DetailBlog';
import DetailClinic from './Patient/Clinic/DetailClinic';
import DetailDoctor from './Patient/Doctor/DetailDoctor/index';
import DetailSpecialty from './Patient/Specialty/index';
import VerifyEmail from './Patient/VerifyEmail';

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
            <Switch>
              <Route path={path.HOME} exact component={HomePage} />
              <Route
                path={path.LOGIN}
                component={userIsNotAuthenticated(Login)}
              />
              <Route
                path={path.SYSTEM}
                component={userIsAuthenticated(System)}
              />
              <Route
                path={path.DOCTOR}
                component={userIsAuthenticated(Doctor)}
              />
            </Switch>
            <Switch>
              <Route path={path.HOMEPAGE} component={HomePage} />
              <Route path={path.LIST_SPECIALTY} component={ListSpecialty} />
              <Route path={path.LIST_CLINIC} component={ListClinic} />
              <Route path={path.LIST_DOCTOR} component={ListDoctor} />
              <Route path={path.LIST_BLOGS} component={ListBlogs} />
              <Route path={path.COVID_19} component={Covid19} />

              <Route path={path.DETAIL_BLOG} component={DetailBlog} />
              <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
              <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
              <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
              <Route path={path.VERIFY_EMAIL_BOOKING} component={VerifyEmail} />
            </Switch>
          </CustomScrollbars>

          <ToastContainer
            position='bottom-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
