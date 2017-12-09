import React from "react";
import Rating from "../../components/Rating";
import ReviewBtn from "../../components/ReviewBtn";
// import DeleteBtn from "../../components/DeleteBtn";
import "./UserReview.css";


export const UserReview = props => (

    <div className="col-sm-6">
        <div className='usercard'>
            <div className="row">
                <div className="col-sm-4">
                    <div className="imgContainer">
                        <img className="img-responsive" alt={props.username} src={props.user_image} />
                        {/* {props.children} */}

                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="content">
                        <ul>
                            <li className="user-name">
                                <strong>{props.username}your name</strong>
                            </li>
                            
                            <hr />
                            
                            <li className="item-review">
                               <p>your comment here {props.comment}</p>
                            </li>
                            <li className="userRating">
                            <Rating index={props.index} />
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            {props.children}
        </div>
    </div>
);


