import React from "react";
import "./ProfileCover.css";

const ProfileCover = props =>
  <div
    className="profileCover text-center"
    style={{ backgroundImage: `url(${props.backgroundImage})` }}
  >
    {props.children}
  </div>;

export default ProfileCover;
