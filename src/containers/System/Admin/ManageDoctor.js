import { Button } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import { getDetailInforDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import './ManageDoctor.scss';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // markdown table
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: '',
      hasOldData: false,
      listDoctors: [],

      // Doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],

      selectedPrice: '',
      selectedPayment: '',
      selectedProvince: '',
      selectedSpecialty: '',

      nameClinic: '',
      addressClinic: '',
      note: '',
      specialtyId: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getRequireDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        'USERS'
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
      let { resPrice, resPayment, resProvince, resSpecialty /*resClinic*/ } =
        this.props.allRequireDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        'PROVINCE'
      );
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        'SPECIALTY'
      );

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
      });
    }

    if (prevProps.language !== this.props.language) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequireDoctorInfor;
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        'USERS'
      );
      let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
      let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        'PROVINCE'
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataInputSelect = (data, type) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      if (type === 'USERS') {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label =
            language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === 'PRICE') {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;
          object.label =
            language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`;
          object.value = item.keymap;
          result.push(object);
        });
      }
      if (type === 'PAYMENT' || type === 'PROVINCE') {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label =
            language === LANGUAGES.VI ? `${labelVi}` : `${labelEn}`;
          object.value = item.keymap;
          result.push(object);
        });
      }
      if (type === 'SPECIALTY') {
        // eslint-disable-next-line array-callback-return
        data.map((item) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveMarkdown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  handleOnChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty } = this.state;

    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = '',
        note = '',
        priceId = '',
        paymentId = '',
        nameClinic = '',
        provinceId = '',
        specialtyId = '',
        selectedPrice = '',
        selectedPayment = '',
        selectedProvince = '',
        selectedSpecialty = '';

      if (res.data.Doctor_infor) {
        addressClinic = res.data.Doctor_infor.addressClinic;
        nameClinic = res.data.Doctor_infor.nameClinic;
        priceId = res.data.Doctor_infor.priceId;
        paymentId = res.data.Doctor_infor.paymentId;
        provinceId = res.data.Doctor_infor.provinceId;
        note = res.data.Doctor_infor.note;

        priceId = res.data.Doctor_infor.priceId;
        paymentId = res.data.Doctor_infor.paymentId;
        provinceId = res.data.Doctor_infor.provinceId;
        specialtyId = res.data.Doctor_infor.specialtyId;

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,

        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,

        priceId: priceId,
        paymentId: paymentId,
        provinceId: provinceId,

        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
      });
    } else {
      this.setState({
        contentHTML: '',
        contentMarkdown: '',
        description: '',
        hasOldData: false,

        note: '',
        nameClinic: '',
        addressClinic: '',

        priceId: '',
        paymentId: '',
        provinceId: '',

        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        selectedSpecialty: '',
      });
    }
  };

  handleOnChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData } = this.state;

    return (
      <Section>
        <Titles title={<FormattedMessage id='admin.manage-doctor.title' />} />
        <div className='manage-doctor-more-infor'>
          <div className='more-infor-left'>
            <div className='choose-doctor form-group'>
              <label>
                <FormattedMessage id='admin.manage-doctor.choose-doctor' />
              </label>
              <Select
                className='choose-doctor-select'
                value={this.state.selectedOption}
                onChange={this.handleOnChangeSelect}
                options={this.state.listDoctors}
                placeholder={
                  <FormattedMessage id='admin.manage-doctor.choose-doctor' />
                }
              />
            </div>
            <div className='row'>
              <div className='col-6 form-group'>
                <label>
                  <FormattedMessage id='admin.manage-doctor.price' />
                </label>
                <Select
                  className='choose-doctor-select'
                  value={this.state.selectedPrice}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listPrice}
                  placeholder={
                    <FormattedMessage id='admin.manage-doctor.price' />
                  }
                  name='selectedPrice'
                />
              </div>
              <div className='col-6 form-group'>
                <label>
                  <FormattedMessage id='admin.manage-doctor.payment' />
                </label>
                <Select
                  className='choose-doctor-select'
                  value={this.state.selectedPayment}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listPayment}
                  placeholder={
                    <FormattedMessage id='admin.manage-doctor.payment' />
                  }
                  name='selectedPayment'
                />
              </div>
              <div className='col-6 form-group'>
                <label>
                  <FormattedMessage id='admin.manage-doctor.province' />
                </label>
                <Select
                  className='choose-doctor-select'
                  value={this.state.selectedProvince}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listProvince}
                  placeholder={
                    <FormattedMessage id='admin.manage-doctor.province' />
                  }
                  name='selectedProvince'
                />
              </div>
              <div className='col-6 form-group'>
                <label>
                  <FormattedMessage id='admin.manage-doctor.clinic-name' />
                </label>
                <input
                  className='form-control'
                  onChange={(event) =>
                    this.handleOnChangeText(event, 'nameClinic')
                  }
                  value={this.state.nameClinic}
                  placeholder='Clinic name'
                />
              </div>

              {/* ------------------------------------------------------------------------ */}
              <div className='col-6 form-group'>
                <label>
                  <FormattedMessage id='admin.manage-doctor.specialty' />
                </label>
                <Select
                  className='choose-doctor-select'
                  value={this.state.selectedSpecialty}
                  onChange={this.handleOnChangeSelectDoctorInfor}
                  options={this.state.listSpecialty}
                  placeholder={
                    <FormattedMessage id='admin.manage-doctor.specialty' />
                  }
                  name='selectedSpecialty'
                />
              </div>
              <div className='col-6 form-group'>
                <label>
                  <FormattedMessage id='admin.manage-doctor.address' />
                </label>
                <input
                  className='form-control'
                  onChange={(event) =>
                    this.handleOnChangeText(event, 'addressClinic')
                  }
                  value={this.state.addressClinic}
                  placeholder='Address...'
                />
              </div>
            </div>
          </div>
          <div className='more-infor-right'>
            <div className='col-12 form-group'>
              <label>
                <FormattedMessage id='admin.manage-doctor.intro-infor' />
              </label>
              <textarea
                className='form-control'
                rows='5'
                onChange={(event) =>
                  this.handleOnChangeText(event, 'description')
                }
                value={this.state.description}
              />
            </div>

            <div className='col-12 form-group'>
              <label>
                <FormattedMessage id='admin.manage-doctor.note' />
              </label>
              <input
                className='form-control'
                onChange={(event) => this.handleOnChangeText(event, 'note')}
                value={this.state.note}
                placeholder='Note...'
              />
            </div>
          </div>
        </div>
        <div className='manage-doctor-editor'>
          <MdEditor
            style={{ height: '300px' }}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
            renderHTML={(text) => mdParser.render(text)}
          />
        </div>
        {/* <button
          className={hasOldData === true ? 'save-doctor' : 'create-doctor'}
          onClick={() => this.handleSaveMarkdown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id='global.btn-update' />
            </span>
          ) : (
            <span>
              <FormattedMessage id='global.btn-create' />
            </span>
          )}
        </button> */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%',
            paddingRight: '50px',
            marginTop: '20px',
          }}
        >
          <Button
            type='primary'
            shape='round'
            onClick={() => this.handleSaveMarkdown()}
            style={{ marginTop: '20px' }}
            size='large'
          >
            {hasOldData === true ? (
              <span>
                <FormattedMessage id='admin.manage-doctor.update-infor' />
              </span>
            ) : (
              <span>
                <FormattedMessage id='admin.manage-doctor.create-infor' />
              </span>
            )}
          </Button>
        </div>
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequireDoctorInfor: state.admin.allRequireDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),

    getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
