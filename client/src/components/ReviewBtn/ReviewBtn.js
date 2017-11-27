import React from "react";
import "./ReviewBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const ReviewBtn = props => (
  <span className="review-btn" {...props}>
    Review
  </span>
);

export default ReviewBtn;
