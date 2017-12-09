import React from "react";
import Rating  from "../../components/Rating";
import ReviewBtn from "../../components/ReviewBtn";
// import DeleteBtn from "../../components/DeleteBtn";
import "./CusItem.css";
import { Link } from "react-router-dom";


export const CusItem = props => (

    <div className="col-sm-4">
        <div className='card'>
            <div className="img-container">
                <img alt={"No Image"} src={props.itemImage} />
                {/* {props.children} */}
                
            </div>
            {/* <DeleteBtn /> */}
            <div className="content">
                <ul>
                    <Link to={"/itemPage/" + props.itemId}> <li className="itemTittle">
                        <strong>{props.itemName}</strong>
                    </li> </Link>
                    <li className="itemDes">
                        {props.itemSummary}
                    </li>
                </ul>
                <hr />
               {/* <Rating index={props.index} /> */}
               <p> Average Rating: {props.averageRating} </p>
            </div>
            {/* <span onClick={() => props.removeItem(props.id)} className="remove">𝘅</span> */}
            
            {/* <ReviewBtn />  */}
            {props.children}
            {/* <EditBtn />  */}
        </div>
    </div>
);


