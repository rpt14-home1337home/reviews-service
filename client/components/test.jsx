const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

const Review = (props) => {

  // ASSIGN LEFT AND RIGHT CLASS TO ALLOW FLEX ALIGNMENT
  const assignClass = (key) => {
    console.log('this is the key ' + key);
    if(key % 2 === 0) {
      return 'review right'
    } else {
      return 'review left'
    }
  }

  // trim reviewTExt without cutting a word in half mid paragraph (RECURSION)
  const trimReview = (review, desiredLength) => {
    if (review[desiredLength] === ' ') {
      return review.slice(0, desiredLength).concat('...');
    } else {
      return trimReview(review, desiredLength - 1);
    }
  }

  //CHECK IF THE REVIEW NEEDS A "SHOW MORE / SHOW LESS" TOGGLE BUTTON
  const checkReviewTooLong = (review) => {
    if(review.length > 250) {
      return true;
    } else {
      return false;
    }
  }

  let reviewText;
  let outputText;
  checkReviewTooLong(props.content) ? outputText = trimReview(props.content, 250) : outputText = props.content;

  if (props.content.length > 250) {
    if(props.isToggled === true) {
      reviewText =
      <div className='reviewText'>
        <p>
          {props.content}
          <span onClick={props.handleToggleClick.bind(this)} className='expandReview'>Show Less</span>
        </p>
      </div>
    } else if(!props.isToggled) {
      reviewText =
      <div className='reviewText'>
        <p>
          {outputText}
          <span onClick={props.handleToggleClick.bind(this)} className='expandReview'>Show More</span>
        </p>
      </div>
    }
  } else {
    reviewText =
    <div className='reviewText'>
      <p>{props.content}</p>
    </div>
  }

outputText = props.content;
  return (
    <div className={assignClass(props.id)} key={props.id}>
      <div className='header'>
        <img className='avatar' src={`../imgs/${props.avatar}`}></img>
        <span className='reviewHeaderContent'>
          <p className='userName'>{props.name}</p>
          <p className='reviewAge'>{`${props.reviewAge} days ago`}</p>
        </span>
      </div>
      {reviewText}
    </div>
  )
};

module.exports = Review;