import React from "react";
import 'font-awesome/css/font-awesome.min.css';

export const Input = props =>
  <div className={props.formgroupclass}>

    <input className="form-control inputLog" {...props} />
    {props.isvalid === "true" ? "" : <span className="help-block">{props.fielderror}</span>}
  </div>;
