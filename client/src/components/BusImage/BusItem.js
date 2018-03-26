import React from "react";
import "./BusItem.css";
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
                <Link to={"/itemPage/" + props.itemId}><button className="seeReviewBtn"> See Reviews </button> </Link>
            </div>

        </div>
    </div>
);


