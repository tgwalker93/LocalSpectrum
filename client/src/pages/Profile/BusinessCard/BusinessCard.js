import React, { Component } from 'react';
import Modal from 'react-bootstrap-modal';
import './BusinessCard.css';
import {ItemContainer, ItemPanel} from '../../../components/ItemContainer';
import {InputLog, TextArea} from '../../../components/LoginItem';
import { Col, Row, Container } from "../../../components/Grid";
// import InputField from './InputField';
import ImageUpload from './ImageUpload';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import API from "../../../utils/API";

class BusinessCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.userId,
            showModal: false,
            BusinessTitle: "",
            BusinessAddress: "",
            // AddressLine2: "",
            // City: "",
            ZipCode: "",
            // State: "",
            // Country: "",
            FacebookLink: "",
            // TwitterHandle: "",
            Instagram: "",
            Email: "",
            PhoneNo: "",
            FaxNo: ""
        };
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick = () => {
        this.setState({showModal: true});
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
        API.saveProfile(formData);
        this.setState({showModal: false});
    }; 

    render() {
        let _closeModal = () => {
            this.setState({showModal: false});
        };       

        return (
            <div>
                <span>
                    <button type="button"
                            className="btn btn-warning addBtn"
                            aria-label = "Left Align"
                            id="btnCreateProfile"
                            onClick={this._handleClick}>
                            <span className="glyphicon glyphicon-open" aria-hidden="true"></span>&nbsp; Create Profile
                    </button>
                </span>
                <Modal show={this.state.showModal} onHide={_closeModal}>
                    <Modal.Header>
                        <Modal.Title>
                            Provide details to Create Profile
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this._saveAndClose}>
                            <Container fluid>
                                <Row>
                                    <Col size="md-12">
                                        <ImageUpload />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size="md-10">
                                        <InputLog
                                            value={this.state.BusinessTitle}
                                            onChange={this._handleInputChange}
                                            name="BusinessTitle"
                                            placeholder="Business Name"
                                            id="inputLogBusinessTitle"
                                        />
                                    </Col>
                                    <Col size="md-2">                                        
                                        <span className="glyphicon glyphicon-asterisk"></span>
                                    </Col>
                                </Row> 
                            <Row><Col size="md-10">
                                <TextArea
                                    value={this.state.AddressLine1}
                                    onChange={this._handleInputChange}
                                    name="AddressLine1"
                                    placeholder="Business Address"
                                    id="txtAreaBusinessAddress"
                                />
                            </Col></Row>
                            {/* <span>
                                <InputLog
                                    value={this.state.AddressLine2}
                                    onChange={this._handleInputChange}
                                    name="AddressLine2"
                                    placeholder="Address Line 2"
                                    id="inputLogAddressLine2"
                                />
                            </span>
                            <span>
                                <InputLog
                                    value={this.state.City}
                                    onChange={this._handleInputChange}
                                    name="City"
                                    placeholder="City"
                                    id="inputLogCity"
                                />
                            </span>
                            <span>
                                <InputLog
                                    value={this.state.State}
                                    onChange={this._handleInputChange}
                                    name="State"
                                    placeholder="State"
                                    id="inputLogState"
                                />
                            </span> */}
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.ZipCode}
                                    onChange={this._handleInputChange}
                                    name="ZipCode"
                                    placeholder="ZipCode"
                                    id="inputLogZipCode"
                                />
                                </Col>
                            </Row>
                            {/* <span>
                                <InputLog
                                    value={this.state.Country}
                                    onChange={this._handleInputChange}
                                    name="Country"
                                    placeholder="Country"
                                    id="inputLogCountry"
                                />
                            </span> */}
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.FacebookLink}
                                    onChange={this._handleInputChange}
                                    name="FacebookLink"
                                    placeholder="Facebook Link"
                                    id="inputLogFacebookLink"
                                />
                                </Col>
                            </Row>
                            {/* <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.TwitterHandle}
                                    onChange={this._handleInputChange}
                                    name="TwitterHandle"
                                    placeholder="Twitter Handle"
                                    id="inputLogTwitterHandle"
                                />
                                </Col>
                            </Row> */}
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.Instagram}
                                    onChange={this._handleInputChange}
                                    name="Instagram"
                                    placeholder="Instagram UserName"
                                    id="inputLogInstagram"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.Email}
                                    onChange={this._handleInputChange}
                                    name="Email"
                                    placeholder="Email Id"
                                    id="inputLogEmail"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.PhoneNo}
                                    onChange={this._handleInputChange}
                                    name="PhoneNo"
                                    placeholder="Phone No."
                                    id="inputLogPhoneNo"
                                />
                                </Col>
                            </Row>
                            <Row>
                                <Col size="md-10">
                                <InputLog
                                    value={this.state.FaxNo}
                                    onChange={this._handleInputChange}
                                    name="FaxNo"
                                    placeholder="Fax No."
                                    id="inputLogFaxNo"
                                />
                                </Col>
                            </Row>
                            </Container>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>
                        <button className="btn btn-primary" onClick={this._saveAndClose}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default BusinessCard; 