import React from "react";

export const FormBtn = props =>
  <button {...props} style={{ float: "left" }} className="btn btn-success">
    {props.children}
  </button>;
