import React, { Component } from 'react';
import { connect } from 'react-redux';

class SearchSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  handleOnChangeSpecialty = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSearchSpecialty = () => {
    this.props.handleSearchSpecialty(this.state.keyword);
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
            placeholder='Search specialty...'
            value={keyword}
            onChange={(event) => this.handleOnChangeSpecialty(event)}
          />
          <button
            className='btn-search'
            type='button'
            onClick={this.handleSearchSpecialty}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchSpecialty);
