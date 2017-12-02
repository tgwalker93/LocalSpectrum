import React, { Component } from 'react';
// import Modal from 'react-bootstrap-modal';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import './BusinessCard.css';
import {ItemContainer, ItemPanel} from '../../../components/ItemContainer';
import {InputLog, TextArea} from '../../../components/LoginItem';
import { Col, Row, Container } from "../../../components/Grid";
// import InputField from './InputField';
import ImageUpload from './ImageUpload';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import ProfileModal from './ProfileModal';
import API from "../../../utils/API";

class BusinessCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userId,
            // showModal: false,
            businessName: "",
            businessAddress: "",
            zipcode: "",
            facebook: "",
            instagram: "",
            email: "",
            phoneNo: "",
            faxNo: ""
        };
        this._handleClick = this._handleClick.bind(this);
        console.log("BusinessCard Constructor: " + this.props);
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
        // this.setState({showModal: false});
    }; 

    routeToProfile(id) {
        console.log("Inside routeToProfile in BusinessCard: " + id);
        this.props.history.push("../profile/"+id);
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
                                    <ImageUpload />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                    <InputLog
                                        value={this.state.businessName}
                                        onChange={this._handleInputChange}
                                        name="businessName"
                                        placeholder="Business Name"
                                        id="inputLogBusinessTitle"
                                    />
                                </Col>
                            </Row>
                            <Row><Col size="md-10">
                                <TextArea
                                    value={this.state.businessAddress}
                                    onChange={this._handleInputChange}
                                    name="businessAddress"
                                    placeholder="Business Address"
                                    id="txtAreaBusinessAddress"
                                />
                            </Col></Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.zipcode}
                                    onChange={this._handleInputChange}
                                    name="zipcode"
                                    placeholder="ZipCode"
                                    id="inputLogZipCode"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.facebook}
                                    onChange={this._handleInputChange}
                                    name="facebook"
                                    placeholder="Facebook Link"
                                    id="inputLogFacebookLink"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.instagram}
                                    onChange={this._handleInputChange}
                                    name="instagram"
                                    placeholder="Instagram UserName"
                                    id="inputLogInstagram"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.email}
                                    onChange={this._handleInputChange}
                                    name="email"
                                    placeholder="Email Id"
                                    id="inputLogEmail"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.phoneNo}
                                    onChange={this._handleInputChange}
                                    name="phoneNo"
                                    placeholder="Phone No."
                                    id="inputLogPhoneNo"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.faxNo}
                                    onChange={this._handleInputChange}
                                    name="faxNo"
                                    placeholder="Fax No."
                                    id="inputLogFaxNo"
                                />
                                </Col>
                            </Row>
                            <hr />
                            <Row><Col size="md-10">
                                <button className="btn btn-primary pull-right" onClick={this._saveAndClose}>Save</button>
                            </Col></Row>
                        </Container>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(BusinessCard); 