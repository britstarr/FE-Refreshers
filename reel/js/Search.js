import React, { Component } from 'react';
import ShowCard from './ShowCard';
import Header from './Header';
import { arrayOf, shape, string } from 'prop-types';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.filterShows = this.filterShows.bind(this);
  }

  handleSearchTermChange (event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  filterShows (show) {
    return `${show.title} ${show.description}`.toUpperCase().indexOf(this.state.searchTerm.toUpperCase()) >= 0;
  }

  render () {
    return (
      <div className='search'>
        <Header
          showSearch
          searchTerm={this.state.searchTerm}
          handleSearchTermChange={this.handleSearchTermChange}
        />
        <div>
          { this.props.shows
            .filter(this.filterShows)
            .map((show) => {
              return (
                <ShowCard key={show.imdbID} {...show} />
              );
            })}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shows: arrayOf(shape({
    title: string,
    description: string
  }))
};

export default Search;
