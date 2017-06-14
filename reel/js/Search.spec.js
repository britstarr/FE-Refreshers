import React from 'react';
import { shallow, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Search from './Search';
import ShowCard from './ShowCard';
import preload from '../public/data.json';

test('Search snapshot test', () => {
  const component = shallow(<Search />);
  const tree = shallowToJson(component);
  expect(tree).toMatchSnapshot();
});

test('Search should render a ShowCard for each show', () => {
  const component = shallow(<Search />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows based on search', () => {
  const searchWord = 'house';
  const component = shallow(<Search />);

  component.find('input').simulate('change', {target: {value:
    searchWord}
  });

  const showCount = preload.shows.filter((show) => {
    return `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
  }).length;

  expect(component.find(ShowCard).length).toEqual(showCount);
});

test('ShowCard should match search term', () => {
  const searchTerm = 'house of cards';
  const card = preload.shows.filter((show) => {
    return show.title.indexOf(searchTerm) >= 0;
  });
  const component = render(<Search key={card.imdbID} {...card}/>);
  const tree = shallowToJson(component);

  expect(tree).toEqual(shallowToJson(preload.shows[0]));
});
