import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { InputLog} from "../../components/LoginItem";
import NavAfter  from "../../components/NavAfter";
import Panel from "../../components/Panel";
import ImageUploader from 'react-images-upload';
import ImageUpload from './ImageUpload.js';
import API from "../../utils/API";
import { BusContainer, BusItem} from "../../components/BusImage";
import { CusContainer, CusItem} from "../../components/CustomerImage";
import axios from 'axios'

class Profile extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        itemName: "",
        itemSummary:"",
        itemImage:"test",
        username: "",
        location:"", //search Location
        logo:"",//Business Logo
        businessDetails:"",//Business Details
        userId: this.props.user,
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
        userSearch: ""
    
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
            //  this.setState({
            //      itemImage: {
            //      file: input.files[0],
            //      imagePreviewURL: reader.result
            //      }
            //  });

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
        // ================ Do this to show the image upload locally ===========================
        this._handleImageChange = this._handleImageChange.bind(this);
        // ================ Do this to show the image upload locally ===========================

        // this.loadUserProfile() 
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    loadItems(){
        console.log("-------loadItems--------")
        console.log(this.props)
        console.log("----------------------")
        console.log(this.props.user.items)
        this.setState({ items: this.props.user.items, username: this.props.user.local.username });
    }

    

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
    
    if (this.state.itemName) {
    console.log("useridadditem: " + this.props.user._id)
    console.log(this.state.itemName)
    console.log("I SUCCESSSFULY ENTERED ADDITEM, below is item image");

    //Save Current Item
    console.log(this.state.itemImage);

        this.setState({
            currentItem: {
                userId: this.props.user._id,
                itemObj: {
                    itemName: this.state.itemName,
                    itemSummary: this.state.itemSummary,
                    // itemImage: this.pictures
                    itemImage: this.state.itemImage
                }
            }
        }, () => {
        //Call Save Item route!
            console.log(this.state.currentItem)
            console.log("Set currentItem is done, this is before I call API.saveItem");
            axios
			.post("/auth/saveItem", {
                item: this.state.currentItem
			})
                .then(res => {
                    console.log("I'm in the call back of save item in addItem!!!")
                    this.loadItems()
                })
                .catch(err => console.log(err));
        });   
    }

}

    render() {
        return (
            <div>

            
            
            <Container fluid >
           
            <div style={{marginLeft: 20, marginRight: 20}}>
                <Row>
                    <Col size="md-12">
                    
                   
                        <form>
                            {/* ======= upload Image button =======*/}
                            <div>
                                <input className="fileInput" type="file"
                                 onChange={this._handleImageChange} />
                            </div>
                            {/* ======= upload Image button =======*/}
                            
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
                        {console.log("I just rendered!")}
                        {console.log(this.state.items)}
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
        </div>
        );

    }
}



export default Profile;
