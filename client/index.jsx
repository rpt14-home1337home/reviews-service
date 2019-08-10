const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Reviews = require('./components/Reviews.jsx');
require('./css/reviews.css');

let dateDifference = (date1, date2) => {
  let difference = date1.getTime() - date2.getTime();

  let daysDifference = Math.floor(difference/1000/60/60/24);
  difference -= daysDifference*1000*60*60*24;
  return difference;
}

ReactDOM.render(<Reviews dateDifference={dateDifference}/>, document.getElementById('reviews'));
