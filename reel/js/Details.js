import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import { shape, string } from 'prop-types';
import key from '../_priv/keys';

class Details extends Component {
  constructor (props) {
    super(props);

    this.state = {
      omdbData: false
    };
  }

  componentDidMount () {
    axios.get(`http://www.omdbapi.com/?apikey=${key.omdb}&i=${this.props.show.imdbID}`)
      .then((response) => {
        this.setState({
          omdbData: response.data
        });
      })
      .catch((error) => console.log('axios broke :(', error));
  }

  render () {
    const { title, description, year, poster, trailer } = this.props.show;
    let rating;
    if (this.state.omdbData.imdbRating) {
      rating = <h3>{this.state.omdbData.imdbRating}</h3>;
    } else {
      rating = <img src='/public/img/loading.png' alt='loading indicator' />;
    }
    return (
      <div className='details'>
        <Header />
        <section>
          <h1>{title}</h1>
          <h2>({year})</h2>
          {rating}
          <img src={`/public/img/posters/${poster}`} alt={`${title} movie poster`} id='posterAltText' />
          <p>{description}</p>
        </section>
        <div>
          <iframe src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`} frameBorder='0' allowFullScreen />
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  show: shape({
    title: string,
    description: string,
    year: string,
    poster: string,
    trailer: string
  })
};

export default Details;
