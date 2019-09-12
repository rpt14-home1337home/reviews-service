const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const Review = require('./Review.jsx');
const AllReviewsLightBox = require('./allReviews.jsx');
const Search = require('./Search.jsx');

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReviews: [],
      isToggled: false,
      referenceItem: null
    }

    if (this.props.referenceItem.length > 1) {
      let refItem = this.props.referenceItem;
      this.state.referenceItem = Number(refItem.slice(1, refItem.length - 1));
    }

    this.parseReviews = this.parseReviews.bind(this);
  }

  getReviewsById(cb) {
    $.ajax({
      url:`/item/${this.state.referenceItem}/reviews`,
      type: 'GET',
      dataType: 'json',
      success: data => {
        cb(data);
      },
      error: err => {
        throw new Error(err);
      }
    })
  }

  getAllReviews(cb) {
    $.ajax({
      url: '/reviews',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        cb(data);
      },
      error: (err) => {
        console.log(err);
        throw new Error(err);
      }
    })
  }

  parseReviews(reviews) {
    this.setState({
      allReviews: reviews.sort(function(a,b) {
        if (Date.parse(a.updatedat) > Date.parse(b.updatedat)) {
          return -1
        } else {
          return 1
        }
      })
    })
  }

  componentDidMount() {
    if(this.state.referenceItem !== null) {
      this.getReviewsById(this.parseReviews);
    } else {
      this.getAllReviews(this.parseReviews);
    }
  }

  render() {
    let sixReviews = this.state.allReviews.slice(0,6);
    return (
      <div>
        <hr></hr>
        <h1>Reviews</h1>
        <div className='allReviews'>
          {
            sixReviews.map((review) => (
              <Review key={review.id}
                      id={review.id}
                      name={review.name}
                      avatar={review.avatar}
                      reviewAge={this.props.dateDifference(Date.now(), Date.parse((review.updatedat)))}
                      content={review.content}
                      allReviews={this.state.allReviews}
                      seeAllReviewsMode={false}
              />))
          }
        </div>
        <div>
          <AllReviewsLightBox dateDifference={this.props.dateDifference} allReviews={this.state.allReviews} showingAll={this.state.showingAll} />
        </div>
      </div>
    )
  }

}

module.exports = Reviews;