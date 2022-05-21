import { Breadcrumb, Button, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils';
import Footer from '../Section/Footer/index';
import SearchBlogs from './SearchBlogs';
import './ListBlogs.scss';

const { Text } = Typography;
class ListBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBlogs: [],
      keyword: '',
      isLoading: false,
      currentPage: 1,
      newsPerPage: 4,
      pageNumberss: 0,
    };
  }

  componentDidMount() {
    this.props.fetchAllBlogs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allBlogs !== this.props.allBlogs) {
      this.setState({
        listBlogs: this.props.allBlogs,
        isLoading: true,
      });
    }
  }

  handleViewDetailBlog = (blog) => {
    if (this.props.history) {
      this.props.history.push(`/detail-blog/${blog.id}`);
    }
  };

  handleSearchBlogs = (keyword) => {
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
    let { listBlogs, keyword, isLoading } = this.state;

    // eslint-disable-next-line array-callback-return
    listBlogs = listBlogs.filter((blog) => {
      if (keyword === '') {
        return listBlogs;
      } else if (blog.name.toLowerCase().includes(keyword.toLowerCase())) {
        return listBlogs;
      }
    });

    const currentPage = this.state.currentPage;
    const newsPerPage = this.state.newsPerPage;
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(listBlogs.length / newsPerPage); i++) {
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
                    <Text>Danh sách các Blogs</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <SearchBlogs
                  className='search'
                  keyword={keyword}
                  handleSearchBlogs={this.handleSearchBlogs}
                />
                <div className='list-doctor'>
                  {listBlogs.length <= 0 ? 'Không tìm thấy blogs...' : ''}
                  {listBlogs
                    .slice(indexOfFirstNews, indexOfLastNews)
                    .map((item, index) => {
                      return (
                        <div className='doctor-item' key={index}>
                          <div
                            className='doctor-item-image'
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                          <div className='doctor-item-infor'>
                            <div>
                              <span>Name: </span>
                              {item.name}
                            </div>
                            <div>
                              <span>Description: </span>
                              {item.description}
                            </div>
                            <Button
                              type='primary'
                              ghost
                              onClick={() => this.handleViewDetailBlog(item)}
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
    allBlogs: state.admin.allBlogs,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllBlogs: () => dispatch(actions.fetchAllBlogs()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListBlogs)
);
