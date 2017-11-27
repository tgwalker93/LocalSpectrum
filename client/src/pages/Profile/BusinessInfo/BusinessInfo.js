import React, { Component } from 'react';
import Modal from 'react-bootstrap-modal';
import './BusinessInfo.css';
import ProductDetails from '../ProductDetails/ProductDetails';
import ImageUpload from '../BusinessCard/ImageUpload';
import {ItemContainer, ItemPanel} from '../../../components/ItemContainer';
import {InputLog, TextArea} from '../../../components/LoginItem';
import { Col, Row, Container } from "../../../components/Grid";
import Jumbotron from '../../../components/Jumbotron';
import Hero from '../../../components/Hero';
// import InputField from './InputField';
import API from "../../../utils/API";

class BusinessInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            userId: this.props.userId,
            userName: "",
            businessName: "",
            businessAddress: "",
            phoneNo: "",
            faxNo: "",
            email: "",
            facebook: "",
            instagram: "",
            zipcode: ""
        };
        this._handleInputChange = this._handleInputChange.bind(this);
    }

    componentDidMount = () => {
        this.loadUserProfile() 
    }

    loadUserProfile = () => {
        API.getProfileInfo(this.state.userId)
            .then(data => {
                this.setState({userName: data.data.username, businessName: data.data.business_name, businessAddress: data.data.business_address, 
                                phoneNo:data.data.business_phone,faxNo:data.data.business_faxno, email:data.data.business_email,
                                facebook: data.data.business_facebook, instagram: data.data.business_instagram, zipcode:data.data.business_zip});
            })
            .catch(err => console.log(err));
    }

    _handleInputChange = event => {
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        });
    };

    render() {
        const userName = this.state.userName; 
        const businessName = this.state.businessName;
        const businessAddress = this.state.businessAddress; 
        const phoneNo = this.state.phoneNo;
        const faxNo = this.state.faxNo;
        const email = this.state.email;
        const facebook = this.state.facebook;
        const instagram = this.state.instagram;
        const zipcode = this.state.zipcode;

        // Function to handle the edit event
        let _editProfile = () => {
            this.setState({showModal: true});
        }

        let _closeModal = () => {
            this.setState({showModal: false});
        }; 

        let _saveAndClose = (event) => {
            // Save the form data and close the modal
            event.preventDefault(); 
        
            const formData = {};
            for (const field in this.state) {
                formData[field] = this.state[field]; 
            }
            console.log(formData);
            API.saveProfile(formData);
            this.setState({showModal: false});
        }

        let editModal = (
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
                                    value={this.state.businessName}
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
                            value={this.state.businessAddress}
                            onChange={this._handleInputChange}
                            name="AddressLine1"
                            placeholder="Business Address"
                            id="txtAreaBusinessAddress"
                        />
                    </Col></Row>
                    <Row>
                        <Col size="md-10">
                        <InputLog
                            value={this.state.zipcode}
                            onChange={this._handleInputChange}
                            name="ZipCode"
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
                            name="FacebookLink"
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
                            name="Instagram"
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
                            name="Email"
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
                            name="PhoneNo"
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
                <button className="btn btn-primary" onClick={_saveAndClose}>Save</button>
            </Modal.Footer>
        </Modal>
        );

        return (
            <div>
                <div className="text-center">
                    <Container fluid>
                        <Row>
                            <Hero backgroundImage="http://localhost:3000/assets/img/map3.jpg">
                                <button className="btn btn-default pull-right" onClick={_editProfile}><i className="fa fa-pencil"></i></button>
                            </Hero>
                            <Col size="md-12">
                                <Row><Col size="md-12">
                                    <div className="col-sm-2 pull-right"><i className="fa fa-address-card-o pull-left">&nbsp;{businessAddress}</i></div>
                                    <div className="col-sm-2 pull-right"><i className="fa fa-user-circle-o pull-left">&nbsp;{businessName}</i></div>
                                </Col></Row>
                                {/* <br/> */}
                                <Row><Col size="md-12"> 
                                    <div className="col-sm-2 pull-right"><i className="fa fa-phone-square pull-left">&nbsp;{phoneNo}</i></div>
                                    <div className="col-sm-2 pull-right"><i className="fa fa-fax pull-left">&nbsp;{faxNo}</i></div>
                                    <div className="col-sm-2 pull-right"><i className="fa fa-envelope-o pull-left">&nbsp;{email}</i></div>
                                </Col></Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {editModal}
                <hr/>
                <ProductDetails />
            </div>
        );
    }
}

export default BusinessInfo; 