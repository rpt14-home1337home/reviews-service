const React = require('react');
const Review = require('./Review.jsx');

class AllReviewsLightBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
    }
    this.seeAllReviews = this.seeAllReviews.bind(this);
  }

  //toggle between viewing all and not viewing all
  seeAllReviews(e) {
    if(e.target !== e.currentTarget) return;
    console.log('seeAllReviews Called!')
    this.setState({
      isToggled: !this.state.isToggled
    })
  }

  // this renders all the messages
  renderAllMessages() {
    return (
      <div className='transparentBackground' onClick={this.seeAllReviews}>
          <div className='allReviewsLightBox'>
          <img src='../imgs/x.svg' className='allReviewsExitButton' onClick={this.seeAllReviews}></img>
          <h1>{this.props.allReviews.length} reviews</h1>
          {
            this.props.allReviews.map( (review) => (
            <div>
              <Review key={review.id}
                      id={review.id}
                      name={review.name}
                      avatar={review.avatar}
                      reviewAge={review.numDaysAgo}
                      content={review.content}
                      allReviews={this.state.allReviews}
                      seeAllReviewsMode={true} />
              <hr></hr>
            </div> ))
          }
        </div>
      </div>
    )
  }

  render() {
    if (this.state.isToggled) {
      return (
        this.renderAllMessages()
      )
    } else {
      return <p className='seeAllReviews' onClick={this.seeAllReviews}> See All Reviews</p>
    }
  }
}

module.exports = AllReviewsLightBox;
