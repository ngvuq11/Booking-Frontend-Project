import { Breadcrumb, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import SpecialtyCard from '../../../../components/SpecialtyCard/index';
import * as actions from '../../../../store/actions';
import Footer from '../Section/Footer/index';
import './ListSpecialty.scss';
import Search from './SearchSpecialty';

const { Text } = Typography;
class ListSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
      keyword: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllSpecialty();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allSpecialties !== this.props.allSpecialties) {
      this.setState({
        listSpecialty: this.props.allSpecialties,
        isLoading: true,
        currentPage: 1,
        newsPerPage: 4,
        pageNumberss: 0,
      });
    }
  }

  handleViewDetailSpecialty = (specialtyId) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialtyId.id}`);
    }
  };

  handleSearchSpecialty = (keyword) => {
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
    let { listSpecialty, keyword, isLoading } = this.state;

    // eslint-disable-next-line array-callback-return
    listSpecialty = listSpecialty.filter((clinic) => {
      if (keyword === '') {
        return listSpecialty;
      } else if (clinic.name.toLowerCase().includes(keyword.toLowerCase())) {
        return listSpecialty;
      }
    });
    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listSpecialty.length / newsPerPage); i++) {
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
                      onClick={() => this.props.history.push('/home')}
                      style={{ cursor: 'pointer' }}
                    >
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>Danh sách các chuyên khoa</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <Search
                  className='search'
                  keyword={keyword}
                  handleSearchSpecialty={this.handleSearchSpecialty}
                />
                {listSpecialty.length <= 0 ? (
                  <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    Không tìm thấy các chuyên khoa...
                  </div>
                ) : (
                  ''
                )}
                <div className='list__specialty--all'>
                  {listSpecialty
                    .slice(indexOfFirstNews, indexOfLastNews)
                    .map((item, index) => {
                      return (
                        <SpecialtyCard
                          key={index}
                          onClick={() => this.handleViewDetailSpecialty(item)}
                          image={item.image}
                          name={item.name}
                          description={item.description}
                        />
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
    language: state.app.language,
    allSpecialties: state.admin.allSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllSpecialty: () => dispatch(actions.fetchAllSpecialty()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListSpecialty)
);
