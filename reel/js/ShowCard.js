import React, { Component } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';

class ShowCard extends Component {
  render () {
    const { poster, title, year, description, imdbID } = this.props;
    return (
      <Link to={`/details/${imdbID}`}>
        <div className='show-card'>
          <img src={`/public/img/posters/${poster}`} />
          <div>
            <h3>{title}</h3>
            <h4>({year})</h4>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    );
  }
}

ShowCard.propTypes = {
  poster: string,
  title: string,
  year: string,
  description: string,
  imdbID: string
};

export default ShowCard;
