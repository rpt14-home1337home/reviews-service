const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Reviews = require('./components/Reviews.jsx');
require('./css/reviews.css');

ReactDOM.render(<Reviews />, document.getElementById('reviews'));
