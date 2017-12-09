import React from "react";
import "./NextBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const NextBtn = props => (
    <span className="next-btn glyphicon glyphicon-chevron-right" {...props}>

    </span>
);

export default NextBtn;