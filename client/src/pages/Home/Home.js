import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";


class Home extends Component {
    // Setting our component's initial state
    state = {
        search: ""
    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {

    }

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-12">
                        <Jumbotron>
                            <h1>Search your item!</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                name="search"
                                placeholder="Burgers, Tacos, Fries"
                            />
    
                            <FormBtn
                                onClick={this.handleFormSubmit}
                            >
                                Search
                            </FormBtn>
 
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
