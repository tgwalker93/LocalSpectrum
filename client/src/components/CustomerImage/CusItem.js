import React from "react";
import "./CusItem.css";
import { Link } from "react-router-dom";


export const CusItem = props => (

    <div className="col-sm-4">
        {props.fromGoogle === true ? <div>TEST TEST </div> : 
        <div className='card'>
            <div className="img-container">
                <img alt={"Missing"} src={props.itemImage} />
                
            </div>
            {/* <DeleteBtn /> */}
            <div className="content text-center">
                <ul>
                    <Link to={"/itemPage/" + props.itemId}> <li className="itemTittle" style={{marginLeft:-50, marginTop:20}}>
                        <strong>{props.itemName}</strong>
                    </li> </Link>
                    <li className="itemDes" style={{marginLeft:-50}}>
                        {props.itemSummary}
                    </li>
                </ul>
                <hr />
               {/* <Rating index={props.index} /> */}
               <p style={{color: '#FF1F99'}}> Average Rating: {props.averageRating} </p>
            </div>
            {/* <span onClick={() => props.removeItem(props.id)} className="remove">𝘅</span> */}
            
            {/* <ReviewBtn />  */}
            {props.children}
            {/* <EditBtn />  */}
        </div>

        }
    </div>
    
);


