import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import { InputLog } from "../../components/LoginItem";
import NavAfter from "../../components/NavAfter";
import Panel from "../../components/Panel";
// import UploadImg from "./UploadImg.js";
import API from "../../utils/API";
import { BusContainer, BusItem } from "../../components/BusImage";
import { CusContainer, CusItem } from "../../components/CustomerImage";
import Rating from "../../components/Rating";
import {UserContainer, UserReview} from "../../components/UserReview"


class ItemPage extends Component {
    // Setting our component's initial state
    state = {
        currentItem: {
            
        },
        itemReviews: []


    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
        this.loadItemReviews();
    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    loadItemReviews() {
        API.getItemReviews(this.props.match.params.itemId)
            .then(data => {
                console.log("API.getItemReviews on the front-end WAS SUCCESSFUL, i'm in the .then");
                console.log(data.data)
                

                this.setState({ itemReviews: data.data.properties.itemReviews, itemName: data.data.properties.itemName });

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

    


                <Container fluid >

                    <div style={{ marginLeft: 20, marginRight: 20 }}>


                        <Row>
                            <h1> Reviews For {(this.state.itemName||"Item")} </h1> 

                            {/* <div className="col-sm-6 col-offset-3">
                                <CusContainer>
                                    <div>
                            

                             <CusItem key={this.state.currentItem._id} itemName={this.state.currentItem.itemName} itemSummary={this.state.currentItem.itemSummary} itemImage={this.state.currentItem.itemImage} />

                             
                                    </div>
                                </CusContainer>
                            </div> */}
                        </Row>
                        <hr />
                        <Row>
                            <div className="col-sm-12">
                                <UserContainer>
                                    <div>
                                        {console.log("I AM BEFORE THE LOOP ----- -- - - - - - -")}
                                        {console.log(this.state.itemReviews)}
                                        
                                        {this.state.itemReviews.map((review, i) => {
                                            console.log("I LOOPED THROUGH A REVIEW, below is review");
                                            console.log(review);
                                            return (

                                                <UserReview key={review._id} username={(review.usernameOfReviewer || "N/A")} comment={(review.comment || "N/A")} rating={(review.rating || "0")}  index={i} />

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