import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
// import { Input, FormBtn } from "../../components/Form";
import { InputLog} from "../../components/LoginItem";
// import NavAfter  from "../../components/NavAfter";
// import Panel from "../../components/Panel";
// import ImageUploader from 'react-images-upload';
// import ImageUpload from './ImageUpload.js';
import API from "../../utils/API";
import { BusContainer } from "../../components/BusImage";
import BusItem from '../../components/BusImage/BusItem';
// import { CusContainer, CusItem} from "../../components/CustomerImage";
// import axios from 'axios';
// Prathibha added these Imports
import Modal from 'react-modal';
// import * as fs from 'fs';
// import { withRouter } from 'react-router';
import {TextArea} from '../../components/Form';
import ProfileCover from "../../components/ProfileCover";
import AddProfile from './AddProfile';
import './AddProfile.css';
// import './ProfileValidations';
import UploadImage from './UploadImage';

class Profile extends Component {
    // Setting our component's initial state
    state = {
        loggedIn: "",
        render: true,
        search: "",
        itemName: "",
        itemSummary: "",
        itemImage: "test",
        username: "",
        location: "", //search Location
        logo: "",//Business Logo
        businessDetails: "",//Business Details
        
         // Prathibha: Added below State elemets to capture the business Profile information
         business_name:"",
         business_address:"",
         business_phone: "",
         business_email:"",
         business_facebook: "",
         business_instagram: "",
         business_fax:"",
         business_logo:"",
         business_zip: "",
         business_description:"",
         business_profile:"",
         // Business profile information additional state elements ends here
         userId: this.props.user,         userProfile: [],
         currentItem: {

        },

        itemIds: [],
        items: [],
        isLoggedIn: false,
        userSearch: "",
        editModal:false,
        isItemUpdate:false    
    };

    // ================ function to upload image locally ===========================
    _handleImageChange(e) {
        e.preventDefault(); 

       let reader = new FileReader();
       //  let file = e.target.files[0];

       console.log(e.target)
       console.log(e.target.files)

       var input = e.target;

       reader.onloadend = () => {
            this.setState({
                itemImage: reader.result
              
            });
           console.log(`itemImage ${input.files[0]}`)
           console.log("WE'RE IN HANDLEIMAGECHANGE, BELOW IS imagePreviewURL");
           // console.log(`this is reader.result: ${reader.result}`)
           console.log(`this is type of reader.result: ${typeof reader.result}`)
           // this.state.itemImage.imagePreviewURL = "test";
           // this.state.itemImage.imagePreviewURL = reader.result
        }
        reader.readAsDataURL(input.files[0]);
    }

   componentDidMount() {
       console.log("--------componentdidmount---------")
       console.log(this.props)
       console.log("------------------------")
       // ================ Do this to show the image upload locally ===========================
       this._handleImageChange = this._handleImageChange.bind(this);
       // ================ Do this to show the image upload locally ===========================
       this.setState({ loggedIn: false });
       // this.loadUserProfile() 
    //    this.loadItems
    this.loadUserProfile()
   }

   componentWillReceiveProps(nextProps){

       if(nextProps.user){
           this.setState({items: nextProps.user.properties.items, username: nextProps.user.properties.username, userProfile: nextProps.user})
       }
   }

   // Handles updating component state when the user types into the input field
   handleInputChange = event => {
       const { name, value } = event.target;
       this.setState({
           [name]: value
       });
   };


//    loadItems() {
//        console.log("-------loadItems--------")
//        console.log(this.props)
//        console.log("----------------------")
//        console.log(this.props.user.items)
//        this.setState({ items: this.props.user.items });
//    }

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
                            business_zip: data.data.business_zip,business_description:data.data.business_description,
                            business_profile:data.data.business_profile });

            })

        .catch(err => console.log(err));
};

   

   // loadUserProfile() {
   //     // this._handleImageChange = this._handleImageChange.bind(this);
   //     console.log("i successfully entered load user profile")
   //     console.log(this.state.items);
   //     API.getUserData(this.state.userId)
   //         .then(data =>
   //             {
   //             console.log("API.getUserData on the front-end WAS SUCCESSFUL, i'm in the .then");
   //             console.log(data.data)

   //             this.setState({ items: data.data.items, username: data.data.username, userProfile: data.data });

   //             })

   //         .catch(err => console.log(err));
       
   // };

   // getUserItemsByItemId(itemIds) {
   //     API.getItems(itemIds)
   //         .then(data => {
   //             console.log("After API.getItems is done in profile")
   //             console.log(data.data)
   //             this.setState({ items: data.data.items}, () => {

   //             })

   //         })

   //         .catch(err => console.log(err));

   // };


   // Then reload books from the database
   handleFormSubmit = event => {
       event.preventDefault();
   };
   addItem = event => {
       event.preventDefault();
       console.log("Before add item");

       if (this.state.itemName) {

           console.log("I SUCCESSSFULY ENTERED ADDITEM, below is item image");

           //Save Current Item
           console.log(this.state.itemImage);

           this.setState({
               currentItem: {
                   userId: this.state.userId,
                   itemObj: {
                       itemName: this.state.itemName,
                       itemSummary: this.state.itemSummary,
                       // itemImage: this.pictures
                       itemImage: this.state.itemImage,
                       userProfile: this.state.userProfile
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
            business_profile:this.state.business_profile,
            business_description:this.state.business_description,
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
    };

    _updateProfileImage = (event) => {
        event.preventDefault();
        let filePath = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            this.setState({business_profile: reader.result});
        }
        reader.readAsDataURL(filePath);
    };

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

    /**
     * Edit Item callback method to handle editing of the item details
     */
    _editItem(itemId) {
        console.log("Profile: callback from Edit button!");
        API.getItem(itemId)
        .then(data => {
            this.setState({
                itemName: data.data.itemName,
                itemSummary: data.data.itemSummary,
                isItemUpdate: true
            });
        });
    }

    /**
     * Delete Item callback method to handle delete of the item
     * @param {*} itemId
     */
    _deleteItem(itemId) {
        console.log("Profile: callback from Delete button!");
        API.deleteItem(itemId);
        window.location.reload();
    }

    /**
     * updateItem function is called with the "Save" button is clicked for updating the item details
     * @param {*} itemId
     */
    updateItem(itemId) {
        console.log("Profile: UpdateItem!");
        // API.updateItem(itemId);
        API.deleteItem(itemId);
        API.saveItem({
            itemName: this.state.itemName,
            itemSummary: this.state.itemSummary,
            itemImage: this.state.itemImage
        })
        window.location.reload();
    }

   render() {
    const customStyles = {
        
        
                        overlay : {
                          position          : 'fixed',
                          top               : 0,
                          left              : 0,
                          right             : 0,
                          bottom            : 0,
                          backgroundColor   : 'rgba(255, 255, 255, 0.75)'
                        },
                        content : {
                          position                   : 'absolute',
                          top                        : '40px',
                          left                       : '40px',
                          right                      : '40px',
                          bottom                     : '40px',
                          border                     : '4px solid orange',
                          background                 : '#fff',
                          overflow                   : 'auto',
                          WebkitOverflowScrolling    : 'touch',
                          borderRadius               : '4px',
                          outline                    : 'none',
                          padding                    : '20px'
        
                        }
        
                };
    return (       
            <div>
            {/* <NavAfter username={this.state.username} /> */}
            {this.state.business_name ?
            (<div>
                <div className="text-center">
                <Container fluid>
                    <Row>
                        <ProfileCover backgroundImage={this.state.business_logo}>
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
                                                    <p className="logo">Upload Business Logo Image</p>
                                                    <UploadImage getImagePath={this._updateBusinessImage}/>
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
                                                    placeholder="Instagram Link"
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
                                                <button className="btn btn-primary pull-right loginBtn" onClick={this._updateAndClose}>Save</button>
                                            </Col></Row>
                                        </Container>
                                    </form>
                                </Modal>
                            </div>
                        </ProfileCover>
                        <Col size="md-12">
                            <Row><Col size="md-12">
                            <img src={this.state.business_profile} className="rounded float-left" alt=""/>
                                <div className="col-sm-2 pull-right text"><a href={this.state.business_facebook} target="_blank" ><i className = "fa fa-facebook-square icon"></i></a></div>
                                {/* <div className="col-sm-2 pull-right text"></div> */}
                                <div className="col-sm-2 pull-right text"><a href={this.state.business_instagram} target="_blank"><i className = "fa fa-instagram icon"></i></a></div>

                                <div className="col-sm-3 pull-right text"><i className="fa fa-address-card-o icon"></i>&nbsp;{this.state.business_address}</div>
                                <div className="col-sm-3 pull-right text"><i className="fa fa-user-circle-o icon"></i>&nbsp;{this.state.business_name}</div>
                            </Col></Row>
                            {/* <br/> */}
                            <Row><Col size="md-12">
                                {/* <div className="col-sm-2 pull-right text2"><a href={this.state.business_instagram} target="_blank"><i className = "fa fa-instagram icon"></i></a></div> */}
                                <div className="col-sm-3 pull-right text2"><i className="fa fa-phone-square icon"></i>&nbsp;{this.state.business_phone}</div>
                                <div className="col-sm-3 pull-right text2"><i className="fa fa-fax icon"></i>&nbsp;{this.state.business_fax}</div>
                                <div className="col-sm-3 pull-right text2"><i className="fa fa-envelope-o icon"></i>&nbsp;{this.state.business_email}</div>
                            </Col></Row>
                        </Col>
                        <Row><Col size="md-12">
                        <div className="descriptionInfo"><h2 className="descriptionTitle">Business Description</h2>{this.state.business_description}</div>
                        </Col>
                        </Row>
                    </Row>
                </Container>
                </div>
                <Container fluid >
                <div style={{marginLeft: 20, marginRight: 20}}>
                <Row>
                    <Col size="md-12">
                        <form>
                            <p className="logo">Item Image</p>
                                <UploadImage getImagePath={this._updateItemImage}/>
                            <p className="titles">Item Name</p>
                            <InputLog
                                value={this.state.itemName}
                                onChange={this.handleInputChange}
                                name="itemName"
                                placeholder="Add your item"
                            />
                            <p className="titles">Item Summary</p>
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
                                            <BusItem key={item.itemName}
                                                            itemName={item.itemName}
                                                            itemSummary={item.itemSummary}
                                                            itemImage={item.itemImage}
                                                            index={i}
                                                            itemId={item._id}
                                                            editItem={(itemId) => this._editItem(itemId)}
                                                            deleteItem={(itemId) => this._deleteItem(itemId)}/>
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