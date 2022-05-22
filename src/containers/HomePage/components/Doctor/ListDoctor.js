import { Breadcrumb, Pagination, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../components/Container/Container.styles';
import DoctorInfor from '../../../../components/DoctorInfor';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import * as actions from '../../../../store/actions';
import Footer from '../../components/Section/Footer/index';
import './ListDoctor.scss';
import Search from './Search';

const { Text } = Typography;
const pageSize = 4;
class ListDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      keyword: '',
      isLoading: false,
      current: 1,
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
        minIndex: 0,
        maxIndex: pageSize,
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
  handleChangePageNumber = (page) => {
    console.log(page);
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
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
                    <Text>Danh sách bác sĩ</Text>
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
                  {listDoctors.map(
                    (item, index) =>
                      index >= this.state.minIndex &&
                      index < this.state.maxIndex && (
                        <DoctorInfor
                          index={index}
                          item={item}
                          language={language}
                          onClick={this.handleViewDetailDoctor}
                        />
                      )
                  )}
                </div>
                <Pagination
                  current={this.state.current}
                  onChange={this.handleChangePageNumber}
                  pageSize={pageSize}
                  total={listDoctors.length}
                  style={{ marginTop: '30px', textAlign: 'end' }}
                />
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
