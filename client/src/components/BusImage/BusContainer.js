import React from "react";
import "./BusContainer.css";

export const BusContainer = ({children}) => (
    <div id="wrapper">
        <h1 style={{marginLeft: 20}}>Your Items</h1>
        <div id="items">
            {children}
        </div>
        <div id="notes"></div>
    </div>
);

// export default ArticlesContainer