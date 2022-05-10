import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomeHeader';
import { withRouter } from 'react-router';
import { LANGUAGES } from '../../../utils';
import CopyRight from '../Section/CopyRight';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';

import './ListSpecialty.scss';

class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: []
    };
  }

  componentDidMount() {
    this.props.fetchAllSpecialty();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        listSpecialty: this.props.data,
      });
    }
  }

  handleViewDetailSpecialty = (specialtyId) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialtyId.id}`);
    }
  };

  render() {
    // let { language } = this.props;
    let { listSpecialty } = this.state;
    console.log(listSpecialty);
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <section className='clinic'>
          <h2 className='title'>Danh sách các phòng khám</h2>
          <div className='list-doctor'>
            {listSpecialty &&
              listSpecialty.length > 0 &&
              listSpecialty.map((item, index) => {
                return (
                  <div className='clinic-item' key={index}>
                    <div className='name-clinic'>{item.name}</div>
                    <div className='image-clinic'>
                      <img src={item.image} />
                    </div>
                    <div onClick={() => this.handleViewDetailSpecialty(item)}>Xem thêm</div>
                  </div>
                );
              })}
            {listSpecialty.length <= 0 ? 'Không tìm thấy các phòng khám...' : ''}
          </div>
        </section>
        <CopyRight />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    data: state.admin.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialtyStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListSpecialty)
);
