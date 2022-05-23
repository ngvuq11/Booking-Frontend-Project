import { Breadcrumb, Pagination, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BlogCard from '../../../../components/BlogCard/index';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import * as actions from '../../../../store/actions';
import Footer from '../Section/Footer/index';
import './ListBlogs.scss';
import SearchBlogs from './SearchBlogs';

const { Text } = Typography;
const pageSize = 4;
class ListBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBlogs: [],
      keyword: '',
      isLoading: false,
      current: 1,
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
        minIndex: 0,
        maxIndex: pageSize,
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
  handleChangePageNumber = (page) => {
    this.setState({
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
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
                    <Text>Blogs</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                <SearchBlogs
                  className='search'
                  keyword={keyword}
                  handleSearchBlogs={this.handleSearchBlogs}
                />
                <div className='list-blogs'>
                  {listBlogs.length <= 0 ? 'Không tìm thấy blogs...' : ''}
                  {listBlogs.map(
                    (item, index) =>
                      index >= this.state.minIndex &&
                      index < this.state.maxIndex && (
                        <BlogCard
                          key={index}
                          image={item.image}
                          onClick={() => this.handleViewDetailBlog(item)}
                          name={item.name}
                        />
                      )
                  )}
                </div>
                <Pagination
                  current={this.state.current}
                  onChange={this.handleChangePageNumber}
                  pageSize={pageSize}
                  total={listBlogs.length}
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
