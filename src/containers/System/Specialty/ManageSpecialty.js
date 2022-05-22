import { Button, Input } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { connect } from 'react-redux';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import * as actions from '../../../store/actions';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import './ManageSpecialty.scss';
import TableManageSpecialty from './TableManageSpecialty';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      action: '',

      clinicId: '',
      listClinic: [],
    };
  }

  async componentDidMount() {
    this.props.getRequireDoctorInfor();
  }

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }

    if (prevProps.allSpecialties !== this.props.allSpecialties) {
      this.setState({
        name: '',
        description: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        clinicId: '',
        listClinic: this.props.allSpecialties,
        action: CRUD_ACTIONS.CREATE,
      });
    }

    if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
      let { resClinic } = this.props.allRequireDoctorInfor;
      let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC');
      this.setState({
        listClinic: dataSelectClinic,
      });
    }
  }

  buildDataInputSelect = (data, type) => {
    let result = [];
    if (data && data.length > 0) {
      if (type === 'CLINIC') {
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

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveSpecialty = async () => {
    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      let res = await this.props.createNewSpecialty(this.state);
      if (res && res.errCode === 0) {
        this.setState({
          name: '',
          description: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
          clinicId: '',
        });
      }
    }

    if (action === CRUD_ACTIONS.EDIT) {
      let res = await this.props.editSpecialty({
        id: this.state.id,
        name: this.state.name,
        description: this.state.description,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
        clinicId: this.state.clinicId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          id: '',
          name: '',
          description: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
          clinicId: '',
        });
      }
    }
  };

  handleEditSpecialty = (specialty) => {
    let imageBase64 = '';
    if (specialty.image) {
      imageBase64 = Buffer.from(specialty.image, 'base64').toString('binary');
      console.log(imageBase64);
    }

    this.setState({
      id: specialty.id,
      name: specialty.name,
      description: specialty.description,
      imageBase64: specialty.imageBase64,
      descriptionHTML: specialty.descriptionHTML,
      descriptionMarkdown: specialty.descriptionMarkdown,
      clinicId: specialty.clinicId,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  handleOnChangeSelect = async (selectedOption) => {
    let { listClinic } = this.state;

    if (listClinic && listClinic.length > 0) {
      this.setState({
        clinicId: selectedOption.value,
      });
    } else {
      this.setState({
        clinicId: '',
      });
    }
  };

  render() {
    let { name, description, descriptionMarkdown, listClinic, action } =
      this.state;

    console.log(listClinic);

    return (
      <Section>
        <Titles
          title={
            <FormattedMessage id='admin.manage-specialty.specialty-title' />
          }
        />
        <div className='specialty-list row'>
          <div className='col-4 form-group'>
            <label>
              <FormattedMessage id='admin.manage-specialty.specialty-name' />
            </label>
            <Input
              size='large'
              value={name}
              placeholder='Specialty Name...'
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className='col-4 form-group'>
            <label>
              <FormattedMessage id='admin.manage-doctor.clinic' />
            </label>
            <Select
              className='choose-doctor-select'
              // value={this.state}
              onChange={this.handleOnChangeSelect}
              options={listClinic}
              placeholder={<FormattedMessage id='admin.manage-doctor.clinic' />}
              name='selectedClinic'
              style={{ width: '100%' }}
            />
          </div>
          <div className='col-4 form-group'>
            <label>
              <FormattedMessage id='admin.manage-specialty.specialty-image' />
            </label>
            <input
              className='form-control-file'
              type='file'
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className='col-12 form-group'>
            <label>
              <FormattedMessage id='admin.manage-specialty.specialty-description' />
            </label>
            <textarea
              className='form-control'
              rows='5'
              onChange={(event) =>
                this.handleOnChangeInput(event, 'description')
              }
              value={description}
            />
          </div>
          <div className='col-12'>
            <MdEditor
              style={{ height: '300px' }}
              onChange={(event) => this.handleEditorChange(event)}
              value={descriptionMarkdown}
              renderHTML={(text) => mdParser.render(text)}
            />
          </div>
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
              onClick={() => this.handleSaveSpecialty()}
              style={{ margin: '20px' }}
              size='large'
            >
              {action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id='admin.manage-specialty.edit' />
              ) : (
                <FormattedMessage id='admin.manage-specialty.save' />
              )}
            </Button>
          </div>
        </div>

        <TableManageSpecialty
          handleEditSpecialty={this.handleEditSpecialty}
          action={action}
        />
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allSpecialties: state.admin.allSpecialties,
    allRequireDoctorInfor: state.admin.allRequireDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewSpecialty: (data) =>
      dispatch(actions.fetchCreateNewSpecialty(data)),
    editSpecialty: (data) => dispatch(actions.editSpecialty(data)),
    getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
