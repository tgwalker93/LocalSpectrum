import React, { Component } from "react";
import { Row, Container } from "../../components/Grid";
import API from "../../utils/API";
import {UserContainer, UserReview} from "../../components/UserReview"
import "./ItemPage.css";

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
                

                this.setState({ itemReviews: data.data.properties.itemReviews, itemName: data.data.properties.itemName });

            })

            .catch(err => console.log(err));

    };

    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();

    };




    render() {
        return (
            <div>

    


                <Container fluid >

                    <div style={{ marginLeft: 20, marginRight: 20 }}>


                        <Row>
                            <h1 className="review-for"> Reviews For {(this.state.itemName||"Item")} </h1> 

                        </Row>
                        <hr />
                        <Row>
                            <div className="col-sm-12">
                                <UserContainer>
                                    <div>
                     
                                        
                                        {this.state.itemReviews.map((review, i) => {
                                        
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