import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Panel from "../../components/Panel";
import API from "../../utils/API";
import { ItemContainer, ItemPanel } from "../../components/ItemContainer"


class Profile extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        itemName: "",
        username: "",
        userId: this.props.match.params.id,
        userProfile: [],
        currentItem: {
            // userId: this.state.userId,
            // itemObj: {
            //     itemName: this.state.itemName
            // }
        },
    
        itemIds: [],
        items: []
    
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
        API.getItemIds(this.state.userId)
            .then(data =>
                {
                console.log("After API.getItems is done in profile")
                console.log(data.data)

                //WORKING ON GETTING ITEM DETAILS FROM ITEM IDs-----------------------------------------------------------------------------------
                // this.setState({ itemIds: data.data.items, username: data.data.username, userProfile: data.data }, () => {
                //     console.log("Before I call getUserItemsByItemId");
                //     console.log(this.state.itemIds);
                //     this.getUserItemsByItemId(this.state.itemIds);
                // })

                this.setState({ items: data.data.items, username: data.data.username, userProfile: data.data });

                })

            .catch(err => console.log(err));
        
    };

    getUserItemsByItemId(itemIds) {
        API.getItems(itemIds)
            .then(data => {
                console.log("After API.getItems is done in profile")
                console.log(data.data)
                this.setState({ items: data.data.items}, () => {

                })

            })

            .catch(err => console.log(err));

    };
    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
        //HANDLE API WORK HERE
        // if (this.state.title && this.state.author) {
        //     API.saveBook({
        //         title: this.state.title,
        //         author: this.state.author,
        //         synopsis: this.state.synopsis
        //     })
        //         .then(res => this.loadBooks())
        //         .catch(err => console.log(err));
        // }
    };
    addItem = event => {
    event.preventDefault();
    
    if (this.state.itemName) {

    //Save Current Item
        this.setState({
            currentItem: {
                userId: this.state.userId,
                itemObj: {
                    itemName: this.state.itemName
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

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Welcome, {this.state.username}</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.itemName}
                                onChange={this.handleInputChange}
                                name="itemName"
                                placeholder="Add Item"
                            />
                            <div>
                            <FormBtn
                                onClick={this.addItem}
                            >
                                Add Item
                            </FormBtn>

                            </div>
                        </form>
                    </Col>
                </Row>
                <Row> 
                <Col size="md-12">
                        {this.state.items.length ? (
                            <ItemContainer>
                                <div>
                                    {this.state.items.map(item => {
                                        return (
                                            <ItemPanel key={item} itemName={item} summary={item}>
                                            </ItemPanel>
                                        );
                                    })}
                                </div>
                            </ItemContainer>
                        ) : (
                                <h3> No Results to Display </h3>
                            )} 
                </Col>
                </Row>
                <Row>
                    <Col size="md-12">
                    <h1> END </h1> 
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;
