import React from "react";
import "./ItemPanel.css";

export const ItemPanel = props => (
    <div className='card'>
        <div className="img-container">
            {/* <img alt={props.itemName} src={props.itemImage} /> */}
            {props.children}
        </div>
        <div className="content">
            <ul>
                <li>
                    <strong>Item Name:</strong> {props.itemName}
                </li>
                <li>
                    <strong>Item Description:</strong> {props.itemSummary}
                </li>
                
            </ul>
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

