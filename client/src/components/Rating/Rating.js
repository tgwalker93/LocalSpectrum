import "./Rating.css";
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
// import Rating from 'react-rating-system';

class StartRating extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
      rating_custom_icon: 6,
      rating_half_star: 3.5,
      rating_empty_initial: 0
    };
  }

  onStarClick(nextValue, prevValue, name) {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({rating: nextValue});
  }

  onStarClickCustomIcon(nextValue, prevValue, name) {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({rating_custom_icon: nextValue});
  }

  onStarClickHalfStar(nextValue, prevValue, name) {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({rating_half_star: nextValue});
  }

  onStarClickEmptyInitial(nextValue, prevValue, name) {
    console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
    this.setState({rating_empty_initial: nextValue});
  }

  render() {
    return (
      <div style={{marginLeft: 20}}>
        <div style={{fontSize: 22}}>
          <StarRatingComponent
            name="app6"
            value={this.state.rating_empty_initial}
            onStarClick={this.onStarClickEmptyInitial.bind(this)}
          />
        </div>
      </div>
    );
  }
}

// ReactDOM.render(
//   <StartRating />,
//   document.getElementById('starRate')
// );






export default StartRating;
