import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
const retrieve = (options) => {
  options = options || {};
  options.page = options.page || 1;
  options.colors = options.colors || [];
  const offset = (options.page * 10) - 10;

  const url = URI(window.path).query({
    limit: 10,
    offset: offset,
    'color[]': options.colors
  });

  return fetch(url)
    .then((res) => res.json())
    .then((res) => analyzeData(res, options.page))
    .catch((err) => console.log('Error in the retrieve function', err))
};

const analyzeData = (data, page) => {
  const items = data.slice(0, 10);
  const ids = items.map((obj) => obj.id);
  const open = items.filter((obj) => obj.disposition ==='open' && checkPrimary(obj) !== null);
  const closedPrimaryCount = items.filter((obj) =>  checkClosedPrimary(obj)).length;
  const previousPage = checkPages(page, items, 'previous');
  const nextPage = checkPages(page, items, 'next');

  return transformData(ids, open, closedPrimaryCount, previousPage, nextPage);
};

const checkPrimary = (obj) => {
  const primaryColors = ['red', 'blue', 'yellow'];
  return primaryColors.includes(obj.color) ? obj.isPrimary = true : obj.isPrimary = false;
};

const checkClosedPrimary = (obj) => {
  return (obj.disposition === 'closed') && checkPrimary(obj) ? true : false;
};

const checkPages = (page, data, position) => {
  if (position === 'previous') {
     return page === 1 ? null : page - 1;
  }

  if (position === 'next') {
    const checkLastPage = (data.length * 10)/2;
    if (checkLastPage === page) {
      return null;
    }
    return data.length === 10 ? page + 1 : null;
  }

  throw 'invalid argument to checkPages';
};

const transformData = (ids, open, closedPrimaryCount, previousPage, nextPage) => {
  return {
    previousPage: previousPage,
    nextPage: nextPage,
    ids: ids,
    open: open,
    closedPrimaryCount: closedPrimaryCount
  };
};

export default retrieve;
