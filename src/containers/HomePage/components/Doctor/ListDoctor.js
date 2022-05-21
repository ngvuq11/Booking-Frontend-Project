import { Breadcrumb, Button, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Footer from '../../components/Section/Footer/index';
import './ListDoctor.scss';
import Search from './Search';

const { Text } = Typography;
class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      keyword: '',
      isLoading: false,
      currentPage: 1,
      newsPerPage: 4,
      pageNumberss: 0,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctors: this.props.allDoctors,
        isLoading: true,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  handleSearchDoctor = (keyword) => {
    this.setState({
      keyword: keyword,
    });
  };
  chosePage = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  render() {
    let { language } = this.props;
    let { listDoctors, keyword, isLoading } = this.state;

    // eslint-disable-next-line array-callback-return
    listDoctors = listDoctors.filter((doctor) => {
      if (keyword === '') {
        return listDoctors;
      } else if (
        doctor.firstName.toLowerCase().includes(keyword.toLowerCase()) ||
        doctor.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
        doctor.address.toLowerCase().includes(keyword.toLowerCase()) ||
        doctor.gender.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return listDoctors;
      }
    });

    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listDoctors.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader isShowBanner={false} />
            <Section className='doctor'>
              <Container>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Text onClick={() => this.props.history.push('/home')}>
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>Danh sách các bác sĩ</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Search
                  className='search'
                  keyword={keyword}
                  handleSearchDoctor={this.handleSearchDoctor}
                />
                <div className='list-doctor'>
                  {listDoctors.length <= 0
                    ? 'Không tìm thấy tên bác sĩ...'
                    : ''}
                  {listDoctors
                    .slice(indexOfFirstNews, indexOfLastNews)
                    .map((item, index) => {
                      let imageBase64 = '';
                      if (item.image) {
                        imageBase64 = Buffer.from(
                          item.image,
                          'base64'
                        ).toString('binary');
                      }
                      let nameVi = `${item.lastName} ${item.firstName}`;
                      let nameEn = `${item.firstName} ${item.lastName}`;
                      return (
                        <div className='doctor-item' key={index}>
                          <div
                            className='doctor-item-image'
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                          <div className='doctor-item-infor'>
                            <div className='name'>
                              <span>Doctor: </span>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div>
                              <span>Email: </span>
                              {item.email}
                            </div>
                            <div>
                              <span>Phone number: </span>
                              {item.phoneNumber}
                            </div>
                            <div>
                              <span>Address: </span>
                              {item.address}
                            </div>
                            <Button
                              type='primary'
                              ghost
                              onClick={() => this.handleViewDetailDoctor(item)}
                            >
                              Xem thêm
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className='pagination-custom'>
                  <ul id='page-numbers'>
                    {pageNumbers.map((number) => {
                      if (this.state.currentPage === number) {
                        return (
                          <li key={number} id={number} className='active'>
                            {number}
                          </li>
                        );
                      } else {
                        return (
                          <li key={number} id={number} onClick={this.chosePage}>
                            {number}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              </Container>
            </Section>
            <Footer />
          </>
        ) : (
          <Spin
            tip='Plese wait...'
            size='large'
            style={{
              width: '100vw',
              height: '100vh',
              maxHeight: 'unset',
              display: 'flex',
              gap: '20px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListDoctor)
);
