import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { func, bool, string } from 'prop-types';

class Header extends Component {
  render () {
    let utilSpace;
    if (this.props.showSearch) {
      utilSpace = <input onChange={this.props.handleSearchTermChange} value={this.props.searchTerm} type='text' placeholder='Search' />;
    } else {
      utilSpace = (
        <h2>
          <Link to='/search'>
            Back
          </Link>
        </h2>
      );
    }
    return (
      <header>
        <h1>
          <Link to='/'>
            Reel
          </Link>
        </h1>
        {utilSpace}
      </header>
    );
  }
}

Header.propTypes = {
  handleSearchTermChange: func,
  showSearch: bool,
  searchTerm: string
};

export default Header;
