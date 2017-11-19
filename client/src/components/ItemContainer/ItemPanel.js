import React from "react";

export const ItemPanel = props => (
    <div className='panel panel-default'>
    <div className='panel-heading'>
    <h3>
    <a className='item-image' target='_blank' href="">
    {props.itemName}
    </a>
    {props.children}
    </h3>
    </div>
    <div className='panel-body'>
    {props.summary}
    </div>
    </div>
);

// export default ArticlePanel