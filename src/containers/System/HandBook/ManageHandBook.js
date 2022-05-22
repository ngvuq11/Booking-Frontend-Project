import MarkdownIt from 'markdown-it';

import React, { Component } from 'react';

import { CommonUtils, CRUD_ACTIONS } from '../../../utils';

import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import TableManageHandBook from './TableManageHandBook';

import './ManageHandBook.scss';
import Titles from '../../../components/Title';
import { Button } from 'antd';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
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

    if (prevProps.allBlogs !== this.props.allBlogs) {
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
        action: CRUD_ACTIONS.CREATE,
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

  handleSaveHandBook = async () => {
    let { action } = this.state;

    if (action === CRUD_ACTIONS.CREATE) {
      let res = await this.props.createNewBlogs(this.state);
      if (res && res.errCode === 0) {
        this.setState({
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        });
      }
    }

    if (action === CRUD_ACTIONS.EDIT) {
      let res = await this.props.editHandBook({
        id: this.state.id,
        name: this.state.name,
        imageBase64: this.state.imageBase64,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
      if (res && res.errCode === 0) {
        this.setState({
          id: '',
          name: '',
          imageBase64: '',
          descriptionHTML: '',
          descriptionMarkdown: '',
        });
      }
    }
  };

  handleEditHandBook = (handBook) => {
    let imageBase64 = '';
    if (handBook.image) {
      imageBase64 = Buffer.from(handBook.image, 'base64').toString('binary');
      console.log(imageBase64);
    }

    this.setState({
      id: handBook.id,
      name: handBook.name,
      image: handBook.imageBase64,
      descriptionHTML: handBook.descriptionHTML,
      descriptionMarkdown: handBook.descriptionMarkdown,
      action: CRUD_ACTIONS.EDIT,
    });
  };

  render() {
    let { name, descriptionMarkdown } = this.state;

    return (
      <div className='manage-specialty'>
        <Titles
          title={<FormattedMessage id='admin.manage-handbook.handbook-title' />}
        />

        <div className='specialty-list row'>
          <div className='col-6 form-group'>
            <label>
              <FormattedMessage id='admin.manage-handbook.handbook-name' />
            </label>
            <input
              className='form-control'
              type='text'
              value={name}
              placeholder='Handbook Name...'
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>
          <div className='col-6 form-group'>
            <label>
              <FormattedMessage id='admin.manage-handbook.handbook-image' />
            </label>
            <input
              className='form-control-file'
              type='file'
              onChange={(event) => this.handleOnChangeImage(event)}
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
              size='large'
              onClick={() => this.handleSaveHandBook()}
            >
              {this.state.action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id='admin.manage-handbook.edit' />
              ) : (
                <FormattedMessage id='admin.manage-handbook.save' />
              )}
            </Button>
          </div>
        </div>

        <TableManageHandBook
          handleEditHandBook={this.handleEditHandBook}
          action={this.state.action}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allBlogs: state.admin.allBlogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBlogs: (data) => dispatch(actions.fetchCreateNewHandBook(data)),
    editHandBook: (data) => dispatch(actions.editHandBook(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandBook);
