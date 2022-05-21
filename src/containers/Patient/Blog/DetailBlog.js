import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../components/Header/HomeHeader';
import { getAllDetailBlogById } from '../../../services/userService';
import { withRouter } from 'react-router';

import _ from 'lodash';
import Footer from '../../HomePage/components/Section/Footer';
import { Breadcrumb, Spin, Typography } from 'antd';
import { Section } from '../../../components/Secction/Section.styleds';
import { Container } from '../../../components/Container/Container.styles';
import './DetailBlog.scss';

const { Text } = Typography;
class DetailBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dataBlog: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getAllDetailBlogById({
        id: id,
      });

      if (res && res.errCode === 0) {
        this.setState({
          dataBlog: res.data,
          isLoading: true,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }
  }

  render() {
    let { dataBlog, isLoading } = this.state;
    // let { language } = this.props;
   console.log(dataBlog);

    return (
      <>
        {isLoading ? (
          <>
            <HomeHeader />
            <Section>
              <Container>
                <Breadcrumb
                  style={{
                    marginBottom: '20px',
                    background: '#fff',
                    padding: '10px 0',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  <Breadcrumb.Item>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/home')}
                    >
                      Home
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text
                      style={{ cursor: 'pointer' }}
                      onClick={() => this.props.history.push('/list-doctor')}
                    >
                      Danh sách các phòng khám
                    </Text>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Text>{dataBlog.name}</Text>
                  </Breadcrumb.Item>
                </Breadcrumb>
                {dataBlog && !_.isEmpty(dataBlog) && (
                  <>
                    <div className='name-clinic'>{dataBlog.name}</div>
                    <div
                      className='content-clinic'
                      dangerouslySetInnerHTML={{
                        __html: dataBlog.descriptionHTML,
                      }}
                    ></div>
                  </>
                )}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailBlog)
);
