import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
import API from "../../utils/API";




class Home extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        location: ""
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
            <div>
                <Nav />
            <Container fluid>
                <Row>
                    <Hero backgroundImage="https://media.giphy.com/media/3o6gbchrcNIt4Ma8Tu/giphy.gif">
                        <h1>Spreading words <span className="glyphicon glyphicon-heart"></span> Spreading love</h1>
                        <h2>Explore & Connect</h2>
                        <Row>
                            <Col size="sm-1 hidden-xs"></Col>
                            <Col size="sm-6">
                            <form>
                                <Input
                                    value={this.state.search}
                                    onChange={this.handleInputChange}
                                    name="search"
                                    placeholder="&#xf002; Search for your local goodies"
                                />

                            </form>
                            </Col>

                            <Col size="sm-2">
                            <form>
                                <Input
                                    value={this.state.location}
                                    onChange={this.handleInputChange}
                                    name="location"
                                    placeholder="&#xf041; enter zipcode"
                                />
                            </form>
                            </Col>

                            <Col size="sm-2">
                            <form>   
                            <FormBtn onClick={this.handleFormSubmit}>Search</FormBtn>
                            </form>
                            </Col>

                            <Col size="sm-1 hidden-xs"></Col>
                          
                        </Row>

                    </Hero>
                    {/* <Col size="md-12">

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
                    </Col> */}
                </Row>
            </Container>
            </div>
        );
    }
}

export default Home;
