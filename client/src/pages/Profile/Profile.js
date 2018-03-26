import React, { Component } from "react";
import { Col, Row, Container } from "../../components/Grid";
import { InputLog} from "../../components/LoginItem";
import API from "../../utils/API";
import { BusContainer, BusItem} from "../../components/BusImage";


class Profile extends Component {
    // Setting our component's initial state
    state = {
        loggedIn: this.props.loggedIn,
        render: true,
        search: "",
        itemName: "",
        itemSummary: "",
        itemImage: "test",
        username: "",
        location: "", //search Location
        logo: "",//Business Logo
        businessDetails: "",//Business Details
        userId: this.props.userId,
        geometry: "this.props.geometry",
        userProfile: "unchanged",
        currentItem: {
            // userId: this.state.userId,
            // itemObj: {
            //     itemName: this.state.itemName
            // }
        },

        itemIds: [],
        items: [],
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
        console.log("--------componentdidmount---------")
        console.log(this.props)
        console.log("------------------------")
        // ================ Do this to show the image upload locally ===========================
        this._handleImageChange = this._handleImageChange.bind(this);
        // ================ Do this to show the image upload locally ===========================
        // this.setState({ loggedIn: false });
        
        // this.loadUserProfile() 
    }

    componentWillReceiveProps(nextProps){
        console.log("COMPONENT RECEIVED PROPS )0)))) ) ) ) )")
        console.log(nextProps);
        console.log(nextProps.coordinates)
        console.log("-----nextProps.user-----")
        console.log(nextProps.user)
        console.log("------------------------")
        if(nextProps.user){
            this.setState({items: nextProps.user.items, username: nextProps.user.username, userProfile: nextProps.user, userId: nextProps.userId})
            console.log("------this.state.userId------")
            console.log(this.state.userId)
            console.log(this.state.username)
            console.log("/------this.state.Id------")
        }
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    loadItems() {
        // console.log("-------loadItems--------")
        // console.log(this.props)
        // console.log("----------------------")
        // console.log(this.props.user.properties.items)
        API.getItems({
            user: this.props.user
        })
        .then(res => {
                console.log("**********************I'm in the call back of save item in getItems!!!")
                // this.loadUserProfile()
                console.log(res.data.properties.items);
            this.setState({ items: res.data.properties.items });
            }).catch(err => console.log(err))
        
    }

    


    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
    };
    addItem = event => {
        console.log("--additem--this.state.userId---")
        console.log(this.state.userId)

        console.log("------geometry------")
        console.log(this.state.geometry)
        console.log("--------------------")

        event.preventDefault();
        console.log("Before add item");

        if (this.state.itemName) {

            console.log("I SUCCESSSFULY ENTERED ADDITEM, below is item image");

            //Save Current Item
            console.log(this.state.itemImage);

            console.log("ALSO BELOW IS USER PROFILE");
            console.log(this.state.userProfile);

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
                console.log("------this.state.userProfile------")
                console.log(this.state.userProfile)
                console.log("/------this.state.userProfile------")
                console.log("Set currentItem is done, this is before I call API.saveItem");
                API.saveItem({
                    item: this.state.currentItem
                })
                    .then(res => {
                        console.log("I'm in the call back of save item in addItem!!!")
                        // this.loadUserProfile()
                        this.loadItems();
                    })
                    .catch(err => console.log(err));
            });
        }

}

    render() {
        if(this.state.render){
            return (
                <div>
  

                    <Container fluid >

                        <div style={{ marginLeft: 20, marginRight: 20 }}>
                            <Row>
                                <Col size="md-12">


                                    <form>
                                        {/* ======= upload Image button =======*/}
                                        <div style={{marginBottom: 30}}>
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
                                {this.state.items ? (
                                    <BusContainer>
                                        <div>
                                            {this.state.items.map((item, i) => {
                                                return (

                                                    <BusItem key={item._id} itemId={item._id} itemName={item.properties.itemName} itemSummary={item.properties.itemSummary} itemImage={item.properties.itemImage} index={i} />

                                                );
                                            }


                                            )}

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
                </div>
                        );
        }
    }
}



export default Profile;
