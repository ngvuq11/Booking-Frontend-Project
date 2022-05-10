import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import { Col, Row, Space, Typography, Select } from 'antd';
import 'antd/dist/antd.css';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Container } from '../../components/Container/Container.styles';
import Logo from '../../components/Logo';

const { Text } = Typography;
const { Option } = Select;
const HeaderWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  .header__row {
    align-items: center;
    .header__col {
      font-size: 17px;
      font-weight: bold;
    }
  }
`;
class HomeHeader extends Component {
  handlechangeLanguage = (value) => {
    this.props.changeLanguageAppRedux(value);
  };

  handleListSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/list-specialty`);
    }
  };

  handleListClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/list-clinic`);
    }
  };

  handleListDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/list-doctor`);
    }
  };

  handleCovid19 = () => {
    if (this.props.history) {
      this.props.history.push(`/covid-19`);
    }
  };
  render() {
    return (
      <React.Fragment>
        <HeaderWrapper>
          <Container>
            <Row className='header__row'>
              <Col span={6}>
                <Logo />
              </Col>
              <Col span={12} className='header__col'>
                <Space size={'large'}>
                  <Text onClick={() => this.handleListSpecialty()}>
                    <FormattedMessage id='header.specialty-menu' />
                  </Text>
                  <Text onClick={() => this.handleListClinic()}>
                    <FormattedMessage id='header.clinic-menu' />
                  </Text>
                  <Text onClick={() => this.handleListDoctor()}>
                    <FormattedMessage id='header.doctor-menu' />
                  </Text>
                  <Text onClick={() => this.handleCovid19()}>
                    <FormattedMessage id='header.covid-19' />
                  </Text>
                </Space>
              </Col>
              <Col span={6} className='header__col'>
                <Space size={'middle'}>
                  <Text
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '15px',
                      color: '#ff0707d9',
                    }}
                  >
                    <QuestionCircleOutlined style={{ marginRight: '8px' }} />
                    <FormattedMessage id='header.support' />
                  </Text>
                  <Select
                    defaultValue={LANGUAGES.VI}
                    style={{ width: 120 }}
                    onChange={(value) => this.handlechangeLanguage(value)}
                  >
                    <Option value={LANGUAGES.VI}>Việt Nam</Option>
                    <Option value={LANGUAGES.EN}>English</Option>
                  </Select>
                </Space>
              </Col>
            </Row>
          </Container>
        </HeaderWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
