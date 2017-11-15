import React from "react";
import 'font-awesome/css/font-awesome.min.css';

export const Input = props =>
  <div className="form-group">
    <input className="form-control" {...props} />
  </div>;
