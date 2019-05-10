const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Review = require('./Review.jsx');
const AllReviewsLightBox = require('./allReviews.jsx');

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      isToggled: false,
      showingAll: false
    }
  }

  getReviews(cb) {
    $.ajax({
      url: '/reviews',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        cb(data)
      },
      error: (err) => {
        throw new Error(err);
      }
    })
  }


  componentDidMount() {
    this.getReviews( (reviews) => {
      console.log('component Mounted: ' + reviews);
      this.setState({
        allReviews: reviews
      })
    })
  }

  render() {
    return (
      <div>
        <hr></hr>
        <h1>Reviews</h1>
        <div className='allReviews'>
          {
            this.state.allReviews.map((review) => (
              <Review key={review.id}
                      id={review.id}
                      name={review.name}
                      avatar={review.avatar}
                      reviewAge={review.numDaysAgo}
                      content={review.content}
                      allReviews={this.state.allReviews}
                      seeAllReviewsMode={false}
              />))
          }
        </div>
        <div>
          <AllReviewsLightBox allReviews={this.state.allReviews} showingAll={this.state.showingAll} />
        </div>
      </div>
    )
  }

}

module.exports = Reviews;