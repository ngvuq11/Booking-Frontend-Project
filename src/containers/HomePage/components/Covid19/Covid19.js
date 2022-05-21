import { Col, Row, Space } from 'antd';
import React, { Component } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Table } from 'antd';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import { getApiCovid19 } from '../../../../services/userService';

import Footer from '../Section/Footer';
import './Covid19.scss';
import Titles from '../../../../components/Title';

class Covid19 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalInternal: [],
      totalWorld: [],
      todayInternal: [],
      todayWorld: [],
      locations: [],
      chartOverview: [],

      isShowVn: true,
      isShowGl: false,
    };
  }

  async componentDidMount() {
    let res = await getApiCovid19();
    this.setState({
      totalInternal: res.total.internal,
      totalWorld: res.total.world,
      todayInternal: res.today.internal,
      todayWorld: res.today.world,
      locations: res.locations,
      chartOverview: res.overview,
    });
  }

  componentDidUpdate(prevProps, prevState) {}

  showVietNam = (status) => {
    this.setState({
      isShowVn: status,
      isShowGl: !status,
    });
  };

  showWorld = (status) => {
    this.setState({
      isShowGl: !status,
      isShowVn: status,
    });
  };
  //
  columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: <FormattedMessage id='home-page.covid-19.province-city' />,
      dataIndex: 'province',
    },
    {
      title: <FormattedMessage id='home-page.covid-19.total-cases' />,
      dataIndex: 'sumCases',
      sorter: {
        compare: (a, b) => a.sumCases - b.sumCases,
        multiple: 3,
      },
    },
    {
      title: <FormattedMessage id='home-page.covid-19.today' />,
      dataIndex: 'newCases',
      sorter: {
        compare: (a, b) => a.newCases - b.newCases,
        multiple: 2,
      },
    },
    {
      title: <FormattedMessage id='home-page.covid-19.death' />,
      dataIndex: 'sumDeaths',
      sorter: {
        compare: (a, b) => a.sumDeaths - b.sumDeaths,
        multiple: 1,
      },
    },
  ];

  render() {
    let {
      totalInternal,
      totalWorld,
      todayInternal,
      // todayWorld,
      locations,
      chartOverview,
      isShowGl,
      isShowVn,
    } = this.state;

    // let { language } = this.props;
    return (
      <>
        <HomeHeader />
        <Section className='covid-19'>
          <Container>
            <div className='total' style={{ marginBottom: '50px' }}>
              <div className='country'>
                <div
                  className={isShowVn === false ? `none` : `active`}
                  onClick={() => this.showVietNam(true)}
                >
                  <AiFillStar />
                  <FormattedMessage id='home-page.covid-19.viet-nam' />
                </div>
                <div className='space'>/</div>
                <div
                  className={isShowGl === false ? `none` : `active`}
                  onClick={() => this.showWorld(false)}
                >
                  <i className='fa fa-globe' aria-hidden='true'></i>
                  <FormattedMessage id='home-page.covid-19.the-world' />
                </div>
              </div>

              {isShowVn === true ? (
                <Row gutter={[15, 15]}>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box cases'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.total-cases' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalInternal.cases}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                      <div className='today'>
                        <FormattedMessage id='home-page.covid-19.today' />: +
                        <NumberFormat
                          value={todayInternal.cases}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box treating'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.treating' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalInternal.treating}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                      <div className='today'>
                        <FormattedMessage id='home-page.covid-19.today' />:
                        <NumberFormat
                          value={todayInternal.treating}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box recovered'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.recovered' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalInternal.recovered}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                      <div className='today'>
                        <FormattedMessage id='home-page.covid-19.today' />: +
                        <NumberFormat
                          value={todayInternal.recovered}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box death'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.death' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalInternal.death}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                      <div className='today'>
                        <FormattedMessage id='home-page.covid-19.today' />: +
                        <NumberFormat
                          value={todayInternal.death}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                []
              )}

              {isShowGl === true ? (
                <Row gutter={[15, 15]}>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box cases'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.total-cases' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalWorld.cases}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box treating'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.treating' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalWorld.treating}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box recovered'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.recovered' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalWorld.recovered}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6} lg={6}>
                    <div className='box death'>
                      <div className='title'>
                        <FormattedMessage id='home-page.covid-19.death' />
                      </div>
                      <div className='value'>
                        <NumberFormat
                          value={totalWorld.death}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                []
              )}
            </div>
            <Space direction='vertical' style={{ display: 'flex' }}>
              <Titles
                title={
                  <FormattedMessage id='home-page.covid-19.national-epidemic-situation' />
                }
              />
              <Table
                columns={this.columns}
                dataSource={locations.map((item, index) => ({
                  stt: index + 1,
                  province: item.name,
                  sumCases: (
                    <NumberFormat
                      value={item.cases}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  ),
                  newCases: (
                    <NumberFormat
                      value={'+' + item.casesToday}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  ),
                  sumDeaths: (
                    <NumberFormat
                      value={item.death}
                      displayType={'text'}
                      thousandSeparator={true}
                    />
                  ),
                }))}
              />
              <Titles title='Bieu do tinh hinh dich trong tuan qua' />
              <ComposedChart width={750} height={450} data={chartOverview}>
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke='#ccc' />
                <Bar
                  dataKey='cases'
                  barSize={30}
                  fill='#2980b9'
                  name={
                    <FormattedMessage id='home-page.covid-19.number-of-infections' />
                  }
                />
                <Line
                  type='monotone'
                  dataKey='avgCases7day'
                  stroke='#e74c3c'
                  name={<FormattedMessage id='home-page.covid-19.average' />}
                />
              </ComposedChart>
            </Space>
          </Container>
        </Section>
        <Footer />
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
    // fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Covid19)
);
