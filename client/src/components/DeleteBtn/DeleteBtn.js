import React, {Component} from "react";
import "./DeleteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
// const DeleteBtn = props => (
  // <span className="delete-btn" {...props}>
    // ✗
  // </span>
// );

class DeleteBtn extends Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return (
      <div>
        <a className="btn btn-warning delete-btn" onClick={this.props.deleteItem}>✗</a>
      </div>
    );
  }
}

export default DeleteBtn;
