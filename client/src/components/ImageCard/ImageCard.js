import React from "react";
import "./ImageCard.css";

const ImageCard = props => (
  <div className="card">
    <div className="img-container">
      <img alt={props.itemName} src={props.itemImage} />
    </div>
    <div className="content">
      <ul>
        <li>
          <strong>Name:</strong> {props.itemName}
        </li>
        <li>
          <strong>Occupation:</strong> {props.occupation}
        </li>
        <li>
          <strong>Address:</strong> {props.address}
        </li>
      </ul>
    </div>
    <span onClick={() => props.removeFriend(props.id)} className="remove">𝘅</span>
  </div>
);

export default ImageCard;
