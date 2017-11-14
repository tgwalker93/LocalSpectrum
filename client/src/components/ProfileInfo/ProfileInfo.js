import React, { Component } from 'react';
import "./ProfileInfo.css";


const ProfileInfo = props => (
 
    <div className="col-sm-6 col-md-6 profileinfo ">
        <h2>Access to Arts beyond High School</h2>
        <small><cite title="San Francisco, USA">San Francisco, USA <i className="glyphicon glyphicon-map-marker">
        </i></cite></small>
        <p>
            <i className="glyphicon glyphicon-envelope"></i> email@example.com
            <br />
            <i className="glyphicon glyphicon-globe"></i><a href="http://www.jquery2dotnet.com"> www.jquery2dotnet.com</a>
            <br />
            <i className="glyphicon glyphicon-gift"></i> June 02, 1988
        </p>
        <p>
            <a href="http://facebook.com" className="btn btn-social-icon btn-facebook">
            <i className="fa fa-facebook"></i></a>   
            <a className="btn btn-social-icon btn-github"><i className="fa fa-github"></i></a>
            <a className="btn btn-social-icon btn-google-plus"><i className="fa fa-google-plus"></i></a>
            <a className="btn btn-social-icon btn-instagram"><i className="fa fa-instagram"></i></a>
            <a className="btn btn-social-icon btn-linkedin"><i className="fa fa-linkedin"></i></a> 
            <a className="btn btn-social-icon btn-twitter"><i className="fa fa-twitter"></i></a>
        </p>
    </div>  
);

export default ProfileInfo;