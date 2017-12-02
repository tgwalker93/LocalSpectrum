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
            username: "",
            userId: this.props.match.params.id,
            businessName: ""
        }
    }

    componentDidMount = () => {
        this.loadUserProfile(); 
    }

    loadUserProfile = () => {
        API.getProfileInfo(this.state.userId)
            .then(data => {
                this.setState({username: data.data.username, businessName: data.data.business_name});
            })
            .catch(err => console.log(err));
    }

    render() {
        let displayBusinessInfo = null;
        const profileExists = this.state.isProfileExists; 
        
        if(this.state.businessName) {
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
                {/* <div className="productDetails"> */}
                    {/* <ProductDetails /> */}
                {/* </div> */}
            </div>
        );
    }
}

export default UserProfile; 