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
    console.log('expand called>?')
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  componentDidMount() {
    console.log('com[ponent did mount ' + this.props.seeAllReviewsMode)
    this.setState({
      seeAllReviewsMode: this.props.seeAllReviewsMode
    })
  }

  render() {
    let reviewText;
    let outputText;
    this.checkReviewTooLong(this.props.content) ? outputText = this.trimReview(this.props.content, 250) : outputText = this.props.content;

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

    return (
    <div className={this.assignClass(this.props.id)} key={this.props.id}>
      <div className='header'>
        <img className='avatar' src={`../imgs/${this.props.avatar}`}></img>
        <span className='reviewHeaderContent'>
          <p className='userName'>{this.props.name}</p>
          <p className='reviewAge'>{`${this.props.reviewAge} days ago`}</p>
        </span>
      </div>
      {reviewText}
    </div>
    )
  }
}

module.exports = Review;