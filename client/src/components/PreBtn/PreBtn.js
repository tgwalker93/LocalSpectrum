import React from "react";
import "./PreBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const PreBtn = props => (
  <span className="next-btn glyphicon glyphicon-chevron-left" {...props}>
   
  </span>
);

export default PreBtn;
