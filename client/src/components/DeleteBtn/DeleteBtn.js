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
  constructor(props) {
    super(props);
  }

//   _deleteItem = event => {
//     // Save the form data and close the modal
//     event.preventDefault(); 

//     const formData = {};
//     for (const field in this.state) {
//         formData[field] = this.state[field]; 
//     }
//     console.log(formData);
//     API.saveProfile(formData)
//     .then(res => {
//         this.setState({user: res.data});
//         this.routeToProfile(this.state.user._id);
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }; 

  render() {
    return (
      <div>
        <a className="btn btn-warning delete-btn" onClick={this.props.deleteItem}>✗</a>
      </div>
    );
  }
}

export default DeleteBtn;
