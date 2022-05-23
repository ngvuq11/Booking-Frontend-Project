import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { getTopClinic } from '../../../../../services/userService';
import Titles from '../../../../../components/Title';
import { Container } from '../../../../../components/Container/Container.styles';
import { Button, Space } from 'antd';
import { Section } from '../../../../../components/Secction/Section.styleds';
import ClinicCard from '../../../../../components/ClinicCard';
import './Clinic.scss';
class Clinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }

  async componentDidMount() {
    let res = await getTopClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  handleviewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  handleviewAllClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/list-clinic`);
    }
  };

  render() {
    let { dataClinic } = this.state;
    return (
      <Section style={{ backgroundColor: '#eee' }}>
        <Container>
          <Space direction='vertical' size={10} style={{ display: 'flex' }}>
            <Titles title={<FormattedMessage id='home-page.clinic' />} />
            <div className='home__clinic--list'>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <ClinicCard
                      key={index}
                      onClick={() => this.handleviewDetailClinic(item)}
                      image={item.image}
                      name={item.name}
                      address={item.address}
                    />
                  );
                })}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '50px',
              }}
            >
              <Button
                type='danger'
                ghost
                onClick={() => this.handleviewAllClinic()}
              >
                <FormattedMessage id='global.see-more' />
              </Button>
            </div>
          </Space>
        </Container>
      </Section>
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
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clinic));
