import React, { Component } from "react";
import Modal from 'react-modal';
import * as fs from 'fs';
import { withRouter } from 'react-router';
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { InputLog} from "../../components/LoginItem";
import {TextArea} from '../../components/Form';
import NavAfter  from "../../components/NavAfter";
import Panel from "../../components/Panel";
import API from "../../utils/API";
import { BusContainer, BusItem} from "../../components/BusImage";
import { CusContainer, CusItem} from "../../components/CustomerImage";
import Hero from "../../components/Hero";
import AddProfile from './AddProfile';
import './AddProfile.css';
import './ProfileValidations';
import UploadImage from './UploadImage';


class Profile extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        itemName: "",
        itemSummary:"",
        itemImage:"",
        itemImgData: "",
        username: "",
        location:"", //search Location
        logo:"",//Business Logo
        businessDetails:"",//Business Details
        /**
         * Prathibha: Added below state elements to capture the business profile information
         */
        business_name:"",
        business_address:"",
        business_phone: "",
        business_email:"",
        business_facebook: "",
        business_instagram: "",
        business_fax:"",
        business_logo:"",
        business_zip: "",
        /**
         * Business profile information additional state elements ends here
         */
        userId: this.props.match.params.id,
        userProfile: [],
        currentItem: {
            // userId: this.state.userId,
            // itemObj: {
            //     itemName: this.state.itemName
            // }
        },
    
        itemIds: [],
        items: [],
        isLoggedIn: false,
        userSearch: "",
        
        editModal: false
    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
        this.loadUserProfile() 
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    loadUserProfile() {
        API.getUserData(this.state.userId)
            .then(data =>
                {
                // console.log("API.getUserData on the front-end WAS SUCCESSFUL, i'm in the .then");
                // console.log(data.data)

                this.setState({ items: data.data.items, username: data.data.username, userProfile: data.data,
                                business_name: data.data.business_name, business_address: data.data.business_address,
                                business_phone: data.data.business_phone, business_email: data.data.business_email,
                                business_facebook: data.data.business_facebook, business_instagram: data.data.business_instagram,
                                business_fax: data.data.business_fax, business_logo: data.data.business_logo,
                                business_zip: data.data.business_zip });

                })

            .catch(err => console.log(err));
    };

    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
    };
    addItem = event => {
        event.preventDefault();
        
        if (this.state.itemName) {

        //Save Current Item
            this.setState({
                currentItem: {
                    userId: this.state.userId,
                    itemObj: {
                        itemName: this.state.itemName,
                        itemSummary: this.state.itemSummary,
                        // itemImage: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Spongebob-squarepants.svg/666px-Spongebob-squarepants.svg.png"
                        itemImage: this.state.itemImage
                    }
                }
            }, () => {
            //Call Save Item route!
                console.log("Set currentItem is done, this is before I call API.saveItem");
                API.saveItem({
                    item: this.state.currentItem
                })
                    .then(res => {
                        console.log("I'm in the call back of save item in addItem!!!")
                        this.loadUserProfile()
                    })
                    .catch(err => console.log(err));
            });   
        }
    }

    /**
     * Prathibha: Below section is for Modal window to edit the profile information
     */

    _editProfile = event => {
        this.setState({editModal: true});
    }

    afterOpenModal = () => {
        
    }

    closeModal = () => {
        this.setState({editModal: false});
    }

    _saveProfile = event => {
        event.preventDefault(); 
        
        const formData = {
            business_name: this.state.business_name,
            business_address: this.state.business_address,
            business_phone: this.state.business_phone,
            business_email:this.state.business_email,
            business_facebook: this.state.business_facebook,
            business_instagram: this.state.business_instagram,
            business_fax:this.state.business_fax,
            business_logo:this.state.business_logo,
            business_zip: this.state.business_zip,
            id: this.state.userId
        };
        
        console.log(formData);
        API.saveProfile(formData)
        .then(res => {
            this.setState({user: res.data});
        })
        .catch(err => {
            console.log("Error in saving profile: " + err);
        });
    }

    _saveAndRedirect = event => {
        this._saveProfile(event);
        this.props.history("/profile/"+this.state.userId);
    }

    _updateAndClose = event => {
        this._saveProfile(event);
        this.closeModal();
    }

    _handleInputChange = event => {
        const {name, value} = event.target; 
        this.setState({
            [name]: value
        });
    };

    _updateBusinessImage = event => {
        event.preventDefault(); 
        let filePath = event.target.files[0];
     
        let reader = new FileReader(); 
        reader.onloadend = () => {
            this.setState({business_logo: reader.result});
        }
        reader.readAsDataURL(filePath);
    }
  
    /**
     * Section complete for the Modal window to edit profile
     */

    /**
     * Callback function from UploadImage component
     */
    _updateItemImage = (event) => {
        event.preventDefault(); 
        let filePath = event.target.files[0];
     
        let reader = new FileReader(); 
        reader.onloadend = () => {
            this.setState({itemImage: reader.result});
        }
        reader.readAsDataURL(filePath);
    }

    render() {
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };
        return (
            <div>
                <NavAfter username={this.state.username} />
                {this.state.business_name ? 
                (<div>
                    <div className="text-center">
                    <Container fluid>
                        <Row>
                            <Hero backgroundImage={this.state.business_logo}>
                                <button className="btn btn-default pull-right" onClick={this._editProfile}><i className="fa fa-pencil"></i></button>
                                <div>
                                    <Modal 
                                        isOpen={this.state.editModal}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}>
                                        <form onSubmit={this._saveAndClose}>
                                            <Container fluid>
                                                <Row>
                                                    <Col size="md-10">
                                                        <UploadImage getImagePath={this._updateBusinessImage}/>
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
                                                    <button className="btn btn-primary pull-right" onClick={this._updateAndClose}>Save</button>
                                                </Col></Row>
                                            </Container>
                                        </form>
                                    </Modal>
                                </div>
                            </Hero>
                            <Col size="md-12"><p>
                                <Row><Col size="md-12">
                                    <div className="col-sm-2 pull-right text"><a href={this.state.business_facebook} target="_blank" ><i className = "fa fa-facebook-square"></i></a></div>
                                    {/* <div className="col-sm-2 pull-right text"></div> */}
                                    <div className="col-sm-3 pull-right text"><i className="fa fa-address-card-o pull-left">&nbsp;{this.state.business_address}</i></div>
                                    <div className="col-sm-3 pull-right text"><i className="fa fa-user-circle-o pull-left">&nbsp;{this.state.business_name}</i></div>
                                </Col></Row></p>
                                {/* <br/> */}<p>
                                <Row><Col size="md-12"> 
                                    <div className="col-sm-2 pull-right text"><a href="#"><i className = "fa fa-instagram"></i></a></div>
                                    <div className="col-sm-3 pull-right text"><i className="fa fa-phone-square pull-left">&nbsp;{this.state.business_phone}</i></div>
                                    <div className="col-sm-3 pull-right text"><i className="fa fa-fax pull-left">&nbsp;{this.state.business_fax}</i></div>
                                    <div className="col-sm-3 pull-right text"><i className="fa fa-envelope-o pull-left">&nbsp;{this.state.business_email}</i></div>
                                </Col></Row></p>
                            </Col>
                        </Row>
                    </Container>
                    </div>
                    <Container fluid >
                    <div style={{marginLeft: 20, marginRight: 20}}>
                    <Row>
                        <Col size="md-12">
                            <form>
                                <p>Item Image</p>
                                    <UploadImage getImagePath={this._updateItemImage}/>
                                <p>Item Name</p>
                                <InputLog
                                    value={this.state.itemName}
                                    onChange={this.handleInputChange}
                                    name="itemName"
                                    placeholder="Add your item"
                                />
                                <p>Item Summary</p>
                                <InputLog
                                    value={this.state.itemSummary}
                                    onChange={this.handleInputChange}
                                    name="itemSummary"
                                    placeholder="Short summary of your item"
                                />
                                <div>
                                <button className="btn btn-warning addBtn"
                                    onClick={this.addItem}
                                >
                                    Add Item
                                </button>
    
                                </div>
                            </form>
                        </Col>
                    </Row>
                    </div>
                    <Row> 
                    <Col size="md-12">
                            {this.state.items.length ? (
                                <BusContainer>
                                    <div>
                                        {this.state.items.map((item, i) => {
                                            return (
                                                <BusItem key={item.itemName} itemName={item.itemName} itemSummary={item.itemSummary} itemImage={item.itemImage} index={i} />
                                            );
                                        })}
                                    </div>
                                </BusContainer>
                            ) : (
                                    <h3> No Results to Display </h3>
                                )} 
                    </Col>
                    </Row>
                    <Row>
                        <Col size="md-12">
                        
                        </Col>
                    </Row>
                </Container>
            {/* Tyler Code Do not Touch This Part */}
            </div>):
                (
                    <div>
                        <AddProfile userId={this.state.userId} userName={this.state.username} test={this.loadUserProfile}/>                        
                    </div>
                )}
            </div>
        );

    }
}

export default Profile;