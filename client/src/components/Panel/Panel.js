import React from "react";


const Panel = props => (

    <div class="panel panel-default">
    <div class="panel-heading">{props.heading}</div>
    <div class="panel-body"> {props.heading} </div>

    {props.children}
</div>

);

export default Panel;