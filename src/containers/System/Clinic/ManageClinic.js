import { Button } from 'antd';
import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { connect } from 'react-redux';
import { Section } from '../../../components/Secction/Section.styleds';
import Titles from '../../../components/Title';
import * as actions from '../../../store/actions';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import './ManageClinic.scss';
import TableManageClinic from './TableManageClinic';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      address: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
      action: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    let { language } = this.props;
    if (language !== prevProps.language) {
    }

    if (prevProps.allClinics !== this.props.allClinics) {
      this.setState({
        name: '',
        address: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        action: CRUD_ACTIONS.CREATE,
      });
    }

    if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
      let { resSpecialty } = this.props.allRequireDoctorInfor;

      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        'SPECIALTY'
      );

      this.setState({
        listSpecialty: dataSelectSpecialty,
      });
    }
  }

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

  handleSaveClinic = async () => {
    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      let res = await this.props.createClinic(this.state);
      if (res && res.errCode === 0) {
        this.setState({
          name: '',
          address: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        });
      }
    }

    if (action === CRUD_ACTIONS.EDIT) {
      let res = await this.props.editClinic({
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      if (res && res.errCode === 0) {
        this.setState({
          id: '',
          name: '',
          address: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        });
      }
    }
  };

  handleEditClinic = (clinic) => {
    let imageBase64 = '';
    if (clinic.image) {
      imageBase64 = Buffer.from(clinic.image, 'base64').toString('binary');
    }

    this.setState({
      id: clinic.id,
      name: clinic.name,
      address: clinic.address,
      image: clinic.imageBase64,
      descriptionHTML: clinic.descriptionHTML,
      descriptionMarkdown: clinic.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
      imageBase64,
    });
  };

  render() {
    let { name, address, descriptionMarkdown } = this.state;
    return (
      <Section className='manage-clinic'>
        <Titles
          title={<FormattedMessage id='admin.manage-clinic.clinic-title' />}
        />

        <div className='clinic-list row'>
          <div className='col-4 form-group'>
            <label>
              <FormattedMessage id='admin.manage-clinic.clinic-name' />
            </label>
            <input
              className='form-control'
              type='text'
              placeholder='Clinic Name...'
              value={name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className='col-4 form-group'>
            <label>
              <FormattedMessage id='admin.manage-clinic.clinic-address' />
            </label>
            <input
              className='form-control'
              type='text'
              placeholder='Clinic Address...'
              value={address}
              onChange={(event) => this.handleOnChangeInput(event, 'address')}
            />
          </div>
          <div className='col-4 form-group'>
            <label>
              <FormattedMessage id='admin.manage-clinic.clinic-image' />
            </label>
            <input
              className='form-control-file'
              type='file'
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className='col-12'>
            <label>Mô tả phòng khám</label>
            <MdEditor
              style={{ height: '300px' }}
              onChange={this.handleEditorChange}
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
            }}
          >
            <Button
              type='primary'
              shape='round'
              size='large'
              onClick={() => this.handleSaveClinic()}
              style={{ marginTop: '20px' }}
            >
              {this.state.action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id='global.btn-update' />
              ) : (
                <FormattedMessage id='global.btn-create' />
              )}
            </Button>
          </div>
        </div>

        <TableManageClinic
          handleEditClinic={this.handleEditClinic}
          action={this.state.action}
        />
      </Section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allClinics: state.admin.allClinics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createClinic: (data) => dispatch(actions.fetchCreateNewClinic(data)),
    editClinic: (data) => dispatch(actions.editClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
