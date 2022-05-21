import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchBlogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  handleOnChangeBlogs = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSearchBlogs = () => {
    this.props.handleSearchBlogs(this.state.keyword);
  };

  render() {
    let { keyword } = this.state;
    return (
      <div className='search__wrapper'>
        <div className='search-bar'>
          <input
            name='keyword'
            type='text'
            className='input-search'
            placeholder='Search Hand book ...'
            value={keyword}
            onChange={(event) => this.handleOnChangeBlogs(event)}
          />
          <span className='input-gr-btn'>
            <button
              className='btn-search'
              type='button'
              onClick={this.handleSearchBlogs}
            >
              <span className='fa fa-search'></span>
              Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBlogs);
