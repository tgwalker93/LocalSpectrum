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

class AddProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userId,
            username:this.props.userName,
            business_name: "",
            business_address: "",
            business_zip: "",
            business_facebook: "",
            business_instagram: "",
            business_email: "",
            business_phone: "",
            business_fax: "",
            business_logo: "",
            business_profile:"",
            business_description:""
        };
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick = () => {
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
        })
        .catch(err => {
            console.log(err);
        });
    }; 

    routeToProfile(id) {
        console.log("Inside routeToProfile in BusinessCard: " + id);
        // this.props.history.push("/profile/"+id);
        window.location.reload(); 
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
    _updateProfileImage = (event) => {
        event.preventDefault(); 
        let filePath = event.target.files[0];
     
        let reader = new FileReader(); 
        reader.onloadend = () => {
            this.setState({business_profile: reader.result});
        }
        reader.readAsDataURL(filePath);
    }

    render() {
        const redirectURI = "/profile/" + this.state.id;
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
                                    <p className="logo">Upload Business Logo Image</p>
                                    <UploadImage getImagePath={this._updateItemImage}/>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col size="md-10">
                                    <p className="logo">Upload Profile Image</p>
                                    <UploadImage getImagePath={this._updateProfileImage}/>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col size="md-10">
                                    <p className="titles">Business Name&nbsp;<i className="fa fa-asterisk" aria-hidden="true"></i></p>
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
                                <p className="titles">Business Address&nbsp;<i className="fa fa-asterisk" aria-hidden="true"></i></p>
                                <TextArea
                                    value={this.state.business_address}
                                    onChange={this._handleInputChange}
                                    name="business_address"
                                    placeholder="Business Address"
                                    id="txtAreaBusinessAddress"
                                />
                            </Col></Row>
                            <Row><Col size="md-10">
                                <TextArea
                                    value={this.state.business_description}
                                    onChange={this._handleInputChange}
                                    name="business_description"
                                    placeholder="Business Description"
                                    id="txtAreaBusinessDescription"
                                />
                            </Col></Row>
                            <Row>
                                <Col size="md-10">
                                <p className="titles">ZipCode&nbsp;<i className="fa fa-asterisk" aria-hidden="true"></i></p>
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
                                <p className="titles">Facebook</p>
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
                                <p className="titles">Instagram Link</p>
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
                                <p className="titles">Email&nbsp;<i className="fa fa-asterisk" aria-hidden="true"></i></p>
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
                                <p className="titles">Phone Number&nbsp;<i className="fa fa-asterisk" aria-hidden="true"></i></p>
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
                                <p className="titles">Fax</p>
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
                                <button className="btn btn-primary pull-right addBtn" onClick={this._saveAndClose}><i className="glyphicon glyphicon-save"></i>&nbsp;Save</button>
                                {/* <a href={redirectURI} className="btn btn-Primary addBtn pull-right" onClick={this._saveAndClose}>
                                    <i className="glyphicon glyphicon-save">Save</i>
                                </a> */}
                            </Col></Row>
                        </Container>
                    </form>
                </div>
            </div>
        );
    }
}

// export default withRouter(AddProfile); 
export default AddProfile;