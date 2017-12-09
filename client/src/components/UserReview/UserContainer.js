import React from "react";
import "./UserContainer.css";

export const UserContainer = ({ children }) => (
    <div id="wrapper">
        <div id="itemReviews">
            {children}
        </div>
    </div>
);