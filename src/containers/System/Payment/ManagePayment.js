import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableManagePayment from './TableManagePayment';

class ManagePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }
  }

  render() {
    return (
      <div className='manage-specialty'>
        <TableManagePayment />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePayment);
