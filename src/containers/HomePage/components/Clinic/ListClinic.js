import { Breadcrumb, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ClinicCard from '../../../../components/ClinicCard';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import * as actions from '../../../../store/actions';
import Footer from '../Section/Footer';
import './ListClinic.scss';
import Search from './SearchClinic';

const { Text } = Typography;
class ListClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
      keyword: '',
      isLoading: false,
      currentPage: 1,
      newsPerPage: 3,
      pageNumberss: 0,
    };
  }

  componentDidMount() {
    this.props.fetchAllClinic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        listClinic: this.props.data,
        isLoading: true,
        pageNumberss: Math.ceil(
          this.props.data.length / this.state.newsPerPage
        ),
      });
    }
  }

  handleViewDetailClinic = (clinicId) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinicId.id}`);
    }
  };

  handleSearchClinic = (keyword) => {
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
    // let { language } = this.props;
    let { listClinic, keyword, isLoading } = this.state;

    // eslint-disable-next-line array-callback-return
    listClinic = listClinic.filter((clinic) => {
      if (keyword === '') {
        return listClinic;
      } else if (
        clinic.name.toLowerCase().includes(keyword.toLowerCase()) ||
        clinic.address.toLowerCase().includes(keyword.toLowerCase())
      ) {
        return listClinic;
      }
    });

    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentTodos = listClinic.slice(indexOfFirstNews, indexOfLastNews);
    const renderTodos = currentTodos.map((item, index) => {
      return (
        <ClinicCard
          image={item.image}
          onClick={() => this.handleViewDetailClinic(item)}
          name={item.name}
          address={item.address}
        />
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listClinic.length / newsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader isShowBanner={false} />
            <Section className='clinic'>
              <Container>
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Text
                      onClick={() => this.props.history.push(`/home`)}
                      style={{ cursor: 'pointer' }}
                    >
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>Danh sách các cơ sở y tế</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Search
                  className='search'
                  keyword={keyword}
                  handleSearchClinic={this.handleSearchClinic}
                />
                <div className='list__clinic--all'>{renderTodos}</div>
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
            tip='Loading...'
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
    language: state.app.language,
    data: state.admin.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllClinic: () => dispatch(actions.fetchAllClinicStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListClinic)
);
