import { Button, Space } from 'antd';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Container } from '../../../../../components/Container/Container.styles';
import { Section } from '../../../../../components/Secction/Section.styleds';
import Titles from '../../../../../components/Title';
import { getTopSpecialty } from '../../../../../services/userService';
import SpecialtyCard from '../../../../../components/SpecialtyCard';
import './Specialty.scss';

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getTopSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };
  handleViewAllSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/list-specialty`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;

    return (
      <Section className='section__specialty'>
        <Container>
          <Space direction='vertical' size={10} style={{ display: 'flex' }}>
            <Titles
              title={<FormattedMessage id='home-page.specialty-popular' />}
            />
            <div className='home__specialty--list'>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <SpecialtyCard
                      onClick={() => this.handleViewDetailSpecialty(item)}
                      name={item.name}
                      image={item.image}
                      description={item.descriptionHTML}
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
                onClick={() => this.handleViewAllSpecialty()}
              >
                Xem tất cả
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
