import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
import HomeHeader from '../../../../components/Header/HomeHeader';
import { getApiCovid19 } from '../../../../services/userService';
import CopyRight from '../Section/CoppyRight/index';
import './Covid19.scss';

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
        <HomeHeader isShowBanner={false} />
        <section className='covid-19'>
          <div className='total'>
            <div className='country'>
              <div
                className={isShowVn === false ? `none` : `active`}
                onClick={() => this.showVietNam(true)}
              >
                <i className='fa fa-star' aria-hidden='true'></i>
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
            <>
              {isShowVn === true ? (
                <div className='list'>
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
                </div>
              ) : (
                []
              )}
            </>
            <>
              {isShowGl === true ? (
                <div className='list'>
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
                </div>
              ) : (
                []
              )}
            </>
          </div>
          <div className='content'>
            <div className='locations'>
              <div className='title'>
                <FormattedMessage id='home-page.covid-19.national-epidemic-situation' />
              </div>
              <div className='table'>
                <div className='header-table'>
                  <span className='colums-table0'>STT</span>
                  <span className='colums-table1'>
                    <FormattedMessage id='home-page.covid-19.province-city' />
                  </span>
                  <span className='colums-table2'>
                    <FormattedMessage id='home-page.covid-19.total-cases' />
                  </span>
                  <span className='colums-table3'>
                    <FormattedMessage id='home-page.covid-19.today' />
                  </span>
                  <span className='colums-table4'>
                    <FormattedMessage id='home-page.covid-19.death' />
                  </span>
                </div>
                <div className='content-table'>
                  {locations.map((item, index) => (
                    <div key={index} className='content-table-list'>
                      <span className='colums-table0'>{index + 1}</span>
                      <span className='colums-table1'>{item.name}</span>
                      <span className='colums-table2'>
                        <NumberFormat
                          value={item.cases}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </span>
                      <span className='colums-table3'>
                        +
                        <NumberFormat
                          value={item.casesToday}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </span>
                      <span className='colums-table4'>
                        <NumberFormat
                          value={item.death}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='chart-covid'>
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
            </div>
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
