import React from "react";
import "./BusItem.css";
import Rating  from "../../components/Rating";
// import ReviewBtn from "../../components/ReviewBtn";
import EditBtn from "../../components/EditBtn";
import DeleteBtn from "../../components/DeleteBtn";
import { Link } from "react-router-dom";


export const BusItem = props => (

    <div className="col-sm-4">
        <div className='card'>
            <div className="img-container">
                <img alt={props.itemName} src={props.itemImage} />
                {props.children}
                
            </div>
            <DeleteBtn />
            <div className="content">
                <ul>
                    <li className="itemTittle">
                        <strong>{props.itemName}</strong>
                    </li>
                    <li className="itemDes">
                        {props.itemSummary}
                    </li>
                </ul>
                <hr />
               {/* <Rating index={props.index} /> */}
                <Link to={"/itemPage/" + props.itemId}><button> See Reviews </button> </Link>
            </div>
            {/* <span onClick={() => props.removeItem(props.id)} className="remove">𝘅</span> */}
            
            {/* <ReviewBtn />  */}
            {/* <EditBtn />  */}
        </div>
    </div>
);


