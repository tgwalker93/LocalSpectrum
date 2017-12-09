import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { InputLog } from "../../components/LoginItem";
import NavAfter from "../../components/NavAfter";
import Panel from "../../components/Panel";
import UploadImg from "./UploadImg.js";
import API from "../../utils/API";
import { BusContainer, BusItem } from "../../components/BusImage";
import { CusContainer, CusItem } from "../../components/CustomerImage";
import { CusContainer, CusItem } from "../../components/CustomerImage";
import Rating from "../../components/Rating";


class ItemPage extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        itemName: "",
        itemSummary: "",
        itemImage: "",
        username: "",
        user_image: "",
        comment: "",
        stars: "",
        location: "", //search Location
        logo: "",//Business Logo
        businessDetails: "",//Business Details
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
        userSearch: ""

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
            .then(data => {
                console.log("API.getUserData on the front-end WAS SUCCESSFUL, i'm in the .then");
                console.log(data.data)

                this.setState({ items: data.data.items, username: data.data.username, userProfile: data.data });

            })

            .catch(err => console.log(err));

    };

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


    //     addItem = event => {
    //     event.preventDefault();

    //     if (this.state.itemName) {

    //     //Save Current Item
    //         this.setState({
    //             currentItem: {
    //                 userId: this.state.userId,
    //                 itemObj: {
    //                     itemName: this.state.itemName,
    //                     itemSummary: this.state.itemSummary,
    //                     // itemImage: this.pictures
    //                 }
    //             }
    //         }, () => {
    //         //Call Save Item route!
    //             console.log("Set currentItem is done, this is before I call API.saveItem");
    //             API.saveItem({
    //                 item: this.state.currentItem
    //             })
    //                 .then(res => {
    //                     console.log("I'm in the call back of save item in addItem!!!")
    //                     this.loadUserProfile()
    //                 })
    //                 .catch(err => console.log(err));
    //         });   
    //     }

    // }

    render() {
        return (
            <div>

                <Nav />


                <Container fluid >

                    <div style={{ marginLeft: 20, marginRight: 20 }}>


                        <Row>
                            <div className="col-sm-6 col-offset-3">
                                <CusContainer>
                                    <div>
                                        {this.state.items.map((item, i) => {
                                            return (

                                                <CusItem key={item.itemName} itemName={item.itemName} itemSummary={item.itemSummary} itemImage={item.itemImage} index={i} />

                                            );
                                        })}
                                    </div>
                                </CusContainer>
                            </div>
                        </Row>
                        <hr />
                        <Row>
                            <div className="col-sm-12">
                                <UserContainer>
                                    <div>
                                        {this.state.items.map((item, i) => {
                                            return (

                                                <UserReview key={item.username} itemReviews={item.comment} itemRating={item.stars} user_image={item.user_image} index={i} />

                                            );
                                        })}
                                    </div>
                                </UserContainer>
                            </div>
                        </Row>
                    </div>
                </Container>
            </div>
        );

    }
}



export default ItemPage;