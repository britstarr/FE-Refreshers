import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import Search from './Search';
import Details from './Details';
import preload from '../public/data';
import '../public/normalize.css';
import '../public/style.css';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className='app'>
          <Route exact path='/' component={Landing} />
          <Route
            path='/search'
            component={(props) => <Search shows={preload.shows} {...props} />}
          />
          <Route
            path='/details/:id'
            component={(props) => {
              const shows = preload.shows.filter((show) => {
                return props.match.params.id === show.imdbID;
              });
              return <Details show={shows[0]} {...props} />;
            }}
          />
        </div>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('app'));
