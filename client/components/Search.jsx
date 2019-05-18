const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
  };

  handleSearchInputChange(value) {
    const temp = [];
    this.props.reviews.forEach( review => {
      if(review.name.includes(value) || review.content.includes(value) ) {
        temp.push(review)
      }
    })

    this.props.filter(temp);
    console.log(temp)
  }

  render() {
    return (
      <div className='reviewSearch'>
        <input type='text' className='reviewFilter' placeholder='Search' onChange={(e) => this.handleSearchInputChange(e.target.value)}></input>
        <img type='submit' className='reviewFilterSumbit' src='./imgs/arrow.svg' ></img>
      </div>
    )
  }
}

module.exports = Search;




////////////////

// let React = require('react');

// const Search = (props) => {

//   let handleSearchInputChange = (value) => {
//     let temp = [];
//     this.props.reviews.forEach( review => {
//       if(review.name.includes(value) || review.content.includes(value) ) {
//         temp.push(review)
//       }
//     })
//     this.props.filter(temp);
//     console.log(temp)
//   }

//   return (
//     <div className='reviewSearch'>
//       <input type='text' className='reviewFilter' placeholder='Search' onChange={(e) => handleSearchInputChange(e.target.value)}></input>
//       <input type='submit' className='reviewFilterSumbit' ></input>
//     </div>
//   )
// }

// module.exports = Search;