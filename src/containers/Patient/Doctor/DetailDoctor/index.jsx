import { Breadcrumb, Col, Image, Row, Space, Spin, Typography } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from '../../../../components/Container/Container.styles';
import HomeHeader from '../../../../components/Header/HomeHeader';
import { Section } from '../../../../components/Secction/Section.styleds';
import { getDetailInforDoctor } from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils';
import Footer from '../../../HomePage/components/Section/Footer';
import Comment from '../../SocialPlugin/Comment';
import LikeAndShare from '../../SocialPlugin/LikeAndShare';
import DoctorExtraInfor from '../DoctorExtraInfor/index';
import DoctorSchedule from '../DoctorSchedule/index';
import './DetailDoctor.scss';

const { Title, Text } = Typography;
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
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

      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
          isLoading: true,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;
    let nameVi = '',
      nameEn = '';

    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? 'https://client-reactjs-datn.herokuapp.com/'
        : window.location.href;

    let doctorInfor = detailDoctor.Doctor_infor;

    return (
      <>
        {this.state.isLoading ? (
          <>
            <HomeHeader />
            <Section className='section__detail--doctor'>
              <Container>
                <Space
                  direction='vertical'
                  size={15}
                  style={{ display: 'flex' }}
                >
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
                      <Text>{language === LANGUAGES.VI ? nameVi : nameEn}</Text>
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  <Row>
                    <Col xs={24} sm={24} md={6} lg={6}>
                      <Image
                        src={
                          detailDoctor && detailDoctor.image
                            ? detailDoctor.image
                            : ''
                        }
                        preview={false}
                      />
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18}>
                      <Space direction='vertical' size={10}>
                        <Title level={3}>
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </Title>
                        {detailDoctor &&
                          detailDoctor.Markdown &&
                          detailDoctor.Markdown.description && (
                            <span>{detailDoctor.Markdown.description}</span>
                          )}
                        <LikeAndShare dataHref={currentURL} />
                      </Space>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={24} sm={24} md={24} lg={12}>
                      <DoctorSchedule
                        doctorInfor={doctorInfor}
                        doctorIdFromParent={this.state.currentDoctorId}
                      />
                    </Col>
                    <Col s={24} sm={24} md={24} lg={12}>
                      <DoctorExtraInfor
                        doctorIdFromParent={this.state.currentDoctorId}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {detailDoctor &&
                      detailDoctor.Markdown &&
                      detailDoctor.Markdown.contentHTML && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: detailDoctor.Markdown.contentHTML,
                          }}
                        ></div>
                      )}
                  </Row>
                  <Row>
                    <Comment dataHref={currentURL} width={'100%'} />
                  </Row>
                </Space>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
