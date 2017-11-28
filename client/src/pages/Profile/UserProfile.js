import React, { Component } from 'react';
import BusinessCard from './BusinessCard/BusinessCard';
import BusinessInfo from './BusinessInfo/BusinessInfo';
import ProductDetails from './ProductDetails/ProductDetails';
import NavAfter  from "../../components/NavAfter";
import API from '../../utils/API'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Prathibha",
            userId: this.props.match.params.id,
            isProfileExists: true // To validate if profile exists
        }
    }

    render() {
        let displayBusinessInfo = null;
        const profileExists = this.state.isProfileExists; 
        
        if(profileExists) {
            displayBusinessInfo = <BusinessInfo userId={this.state.userId}/>;
        } else {
            displayBusinessInfo = <BusinessCard userId={this.state.userId}/>;
        }

        return (
            <div className="profileShell">
                <NavAfter username={this.state.username} />
                <div className="businessCard">
                    {displayBusinessInfo}
                </div>
                <div className="productDetails">
                    {/* <ProductDetails /> */}
                </div>
            </div>
        );
    }
}

export default UserProfile; 