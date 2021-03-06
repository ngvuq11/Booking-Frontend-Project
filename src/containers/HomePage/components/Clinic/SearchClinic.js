import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchClinic.scss';

class SearchClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  handleOnChangeClinic = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSearchClinic = () => {
    this.props.handleSearchClinic(this.state.keyword);
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
            placeholder='Search clinic...'
            value={keyword}
            onChange={(event) => this.handleOnChangeClinic(event)}
          />
          <button
            className='btn-search'
            type='button'
            onClick={this.handleSearchClinic}
          >
            <span className='fa fa-search'></span>
            Search
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchClinic);
