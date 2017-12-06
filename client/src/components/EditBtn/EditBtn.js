import React, {Component} from "react";
import "./EditBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
// const EditBtn = props => (
  // <span className="edit-btn" {...props}>
  //   Edit
  // </span>
  // <a className="btn btn-success edit-btn" 
      // onClick={() => {
        {/* console.log("EditBtn: onClick event called!"); */}
        // this.props.editItem; 
      // }}>
      // <i className="glyphicon glyphicon-edit"></i>&nbsp;Edit
  // </a>
// );

class EditBtn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
     <div>
       <a className="btn btn-success edit-btn"
          onClick={this.props.editItem}>
          <i className="glyphicon glyphicon-edit"></i>&nbsp;Edit
          </a>
       </div> 
    );
  }  
}

export default EditBtn;
