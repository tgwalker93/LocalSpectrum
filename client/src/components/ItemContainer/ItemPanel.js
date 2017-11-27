import React from "react";
import "./ItemPanel.css";
import Rating  from "../../components/Rating";
import ReviewBtn from "../../components/ReviewBtn";
import DeleteBtn from "../../components/DeleteBtn";


export const ItemPanel = props => (

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
               <Rating />
            </div>
            {/* <span onClick={() => props.removeItem(props.id)} className="remove">𝘅</span> */}
            
            <ReviewBtn /> 
        </div>
    </div>



);

    //     {/* <h3>
    //         <a className='item-image' target='_blank' href="">
    //             {props.itemName},
    //         </a>
    //         {props.children}
    //     </h3> */}

    // // <div className='panel-body'>
    // //     {props.itemSummary}
    // // </div>

// );

// export default ArticlePanel

// export const ItemPanel = props => (
//     <div className='panel panel-default'>
//     <div className='panel-heading'>
//     <h3>
//     <a className='item-image' target='_blank' href="">
//     {props.itemName},
//     </a>
//     {props.children}
//     </h3>
//     </div>
//     <div className='panel-body'>
//     {props.itemSummary}
//     </div>
//     </div>
// );


// import React from "react";
// import "./ImageCard.css";

