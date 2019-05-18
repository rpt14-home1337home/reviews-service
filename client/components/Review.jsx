const React = require('react');

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
      seeAllReviewsMode: this.props.seeAllReviewsMode
    }
    this.reviewExpander = this.reviewExpander.bind(this);
  }

  // assign a class based on where reviews are being loaded
  assignClass(key) {
    if(this.props.seeAllReviewsMode) {
      return 'review'
    }
    if(key % 2 === 0) {
      return 'review right'
    } else {
      return 'review left'
    }
  }

  // trim review message to shorten length
  trimReview(review, desiredLength) {
    if (review[desiredLength] === ' ') {
      return review.slice(0, desiredLength).concat('...');
    } else {
      return this.trimReview(review, desiredLength - 1);
    }
  }

  //check review length and trim it if too long
  checkReviewTooLong(review) {
    if(review.length > 250) {
      return true;
    } else {
      return false;
    }
  }

  // handles the 'read more' button for all longer reviews
  reviewExpander() {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  consolidateDaysPast(value) {
    if (value > 29 && value < 60) {
      return Math.floor(value/30) + ' month ago'
    }
    if (value > 59 && value < 365) {
      return Math.floor(value/30) + ' months ago'
    }
    if (value > 365) {
      return Math.floor(value/365) + ' year ago'
    }
    if (value > 730) {
      return Math.floor(value/365) + ' years ago'
    }
    return value + ' days ago'
  }

  componentWillMount() {
    this.setState({
      seeAllReviewsMode: this.props.seeAllReviewsMode
    })
  }

  render() {
    let reviewText;
    let outputText;
    this.checkReviewTooLong(this.props.content) ? outputText = this.trimReview(this.props.content, 250) : outputText = this.props.content;

    //Check length of review and determine which format to render
    if (this.props.content.length > 250) {
      if(this.state.isToggled === true) {
        reviewText =
        <div className='reviewText'>
          <p>
            {this.props.content}
            <span onClick={this.reviewExpander} className='expandReview'>Show Less</span>
          </p>
        </div>
      } else if(!this.state.isToggled) {
        reviewText =
        <div className='reviewText'>
          <p>
            {outputText}
            <span onClick={this.reviewExpander} className='expandReview'>Show More</span>
          </p>
        </div>
      }
    } else {
      reviewText =
      <div className='reviewText'>
        <p>{this.props.content}</p>
      </div>
    }

    outputText = this.props.content;
    const alternateClassAssignment = 1; // keep count
    // GET AGE OF REVIEW
    const reviewAge = this.consolidateDaysPast(this.props.reviewAge);

    return (
    <div className={this.assignClass(alternateClassAssignment+1)} key={this.props.id}>
      <div className='header'>
        <img className='avatar' src={this.props.avatar}></img>
        <span className='reviewHeaderContent'>
          <p className='userName'>{this.props.name}</p>
          <p className='reviewAge'>{reviewAge}</p>
        </span>
      </div>
      {reviewText}
    </div>
    )
  }
}

module.exports = Review;