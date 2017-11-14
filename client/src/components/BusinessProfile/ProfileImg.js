import React, { Component } from 'react';
import ProfileInfo from './components/ProfileInfo'
import "./styles/ProfileImg.css";


const ProfileImg = props => (
    <div className="row">
        <div className="col-sm-6 col-md-4">
            <img src="http://a2ru.org/wp-content/uploads/2011/09/Northwestern_High_School_Student_Art_Gallery.jpg" alt="" className=" img-responsive" /> 
        </div>
        <ProfileInfo />
    </div>
    
);

export default ProfileImg;