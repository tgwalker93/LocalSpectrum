import React from "react";
import 'font-awesome/css/font-awesome.min.css';

export const TextLog = props =>
  <div className="form-group">
    <textarea className="form-control" rows="5" {...props} />
  </div>;
