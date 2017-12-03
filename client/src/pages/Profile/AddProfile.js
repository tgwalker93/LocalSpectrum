import React, { Component } from 'react';

// import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Redirect } from 'react-router-dom';
// import { withRouter } from 'react-router';

import './AddProfile.css';
import UploadImage from './UploadImage'
import { Col, Row, Container } from "../../components/Grid";
import {InputLog} from '../../components/LoginItem';
import {TextArea} from '../../components/Form';
import {ReviewBtn} from '../../components/ReviewBtn';

import API from "../../utils/API";
// import ImageUpload from './ImageUpload';
// import BusinessInfo from '../BusinessInfo/BusinessInfo';

class AddProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userId,
            // showModal: false,
            username:this.props.userName,
            business_name: "",
            business_address: "",
            business_zip: "",
            business_facebook: "",
            business_instagram: "",
            business_email: "",
            business_phone: "",
            business_fax: "",
            business_logo: ""
        };
        this._handleClick = this._handleClick.bind(this);
        // console.log("BusinessCard Constructor: " + this.props);
    }

    _handleClick = () => {
        // this.setState({showModal: true});
    };

    _handleInputChange = event => {
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        });
    };

    _saveAndClose = event => {
        // Save the form data and close the modal
        event.preventDefault(); 

        const formData = {};
        for (const field in this.state) {
            formData[field] = this.state[field]; 
        }
        console.log(formData);
        API.saveProfile(formData)
        .then(res => {
            this.setState({user: res.data});
            this.routeToProfile(this.state.user._id);
        });
    }; 

    routeToProfile(id) {
        console.log("Inside routeToProfile in BusinessCard: " + id);
        // this.props.history.push("../profile/"+id);
    }

    _updateItemImage = (event) => {
        event.preventDefault(); 
        let filePath = event.target.files[0];
     
        let reader = new FileReader(); 
        reader.onloadend = () => {
            this.setState({business_logo: reader.result});
        }
        reader.readAsDataURL(filePath);
    }

    render() {
        const {history} = this.props;
        return (
            <div>
                <span>
                    <button type="button"
                            className="btn btn-warning addBtn"
                            aria-label = "Left Align"
                            id="btnCreateProfile"
                            data-toggle="collapse"
                            data-target="#addProfileDiv">
                            <span className="glyphicon glyphicon-open" aria-hidden="true"></span>&nbsp; Create Profile
                    </button>
                </span>
                <div className="collapse" id="addProfileDiv">
                    <form onSubmit={this._saveAndClose}>
                        <Container fluid>
                            <Row>
                                <Col size="md-10">
                                    <UploadImage getImagePath={this._updateItemImage}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                    <InputLog
                                        value={this.state.business_name}
                                        onChange={this._handleInputChange}
                                        name="business_name"
                                        placeholder="Business Name"
                                        id="inputLogBusinessTitle"
                                    />
                                </Col>
                            </Row>
                            <Row><Col size="md-10">
                                <TextArea
                                    value={this.state.business_address}
                                    onChange={this._handleInputChange}
                                    name="business_address"
                                    placeholder="Business Address"
                                    id="txtAreaBusinessAddress"
                                />
                            </Col></Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.business_zip}
                                    onChange={this._handleInputChange}
                                    name="business_zip"
                                    placeholder="ZipCode"
                                    id="inputLogZipCode"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.business_facebook}
                                    onChange={this._handleInputChange}
                                    name="business_facebook"
                                    placeholder="Facebook Link"
                                    id="inputLogFacebookLink"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.business_instagram}
                                    onChange={this._handleInputChange}
                                    name="business_instagram"
                                    placeholder="Instagram UserName"
                                    id="inputLogInstagram"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.business_email}
                                    onChange={this._handleInputChange}
                                    name="business_email"
                                    placeholder="Email Id"
                                    id="inputLogEmail"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.business_phone}
                                    onChange={this._handleInputChange}
                                    name="business_phone"
                                    placeholder="Phone No."
                                    id="inputLogPhoneNo"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.business_fax}
                                    onChange={this._handleInputChange}
                                    name="business_fax"
                                    placeholder="Fax No."
                                    id="inputLogFaxNo"
                                />
                                </Col>
                            </Row>
                            <hr />
                            <Row><Col size="md-10">
                                <button className="btn btn-primary pull-right" onClick={this._saveAndClose}>Save</button>
                                {/* <ReviewBtn class="btn btn-primary pull-right" onClick={this._saveAndClose}>Save</ReviewBtn> */}
                            </Col></Row>
                        </Container>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddProfile; 