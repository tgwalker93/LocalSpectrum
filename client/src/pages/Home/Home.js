import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import { BusContainer } from "../../components/BusImage";
import BusItem from '../../components/BusImage/BusItem';


class Home extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        location: "",
        items: []
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
        console.log("i'm in handle form submit");

        if (this.state.search) {
            API.search({
                search: this.state.search,
                location: this.state.location
            })
                .then(res => {
                    console.log("I'm in the call back of save item in API SEARCH!!!")
                    console.log(res.data);
                    this.setState({
                        items: res.data
                    });
                })
                .catch(err => console.log(err));
        }
    };

    /**
     * Default callback function for google maps API that we are using for location autocomplete
     */
    intiMap = () => {

    }

    // autocomplete = () => {
    //     let autocomplete = new google.maps.places.Autocomplete((document.getElementById('location')),
    //                {types:['geocode']});
    // }
    
    render() {
        return (
            <div>
                <Nav />
            <Container fluid>
                <Row>
                    {/* <Hero backgroundImage="https://media.giphy.com/media/3o6gbchrcNIt4Ma8Tu/giphy.gif"> */}
                    <Hero backgroundImage="assets/img/map3.jpg">
                        {/* <h1>Spreading words <span className="glyphicon glyphicon-heart"></span> Spreading love</h1>
                        <h2>Explore & Connect</h2> */}
                    </Hero>
                </Row>
                <div className ="row inputBox">
                            <Col size="sm-1"></Col>
                            <Col size="sm-6">
                            <form>
                                <Input
                                    value={this.state.search}
                                    onChange={this.handleInputChange}
                                    name="search"
                                    placeholder=" &#xf002; Search for your local goodies"
                                />

                            </form>
                            </Col>

                            <Col size="sm-2">
                            <form>
                                <Input
                                    value={this.state.location}
                                    onChange={this.handleInputChange}
                                    name="location"
                                    id="location"
                                    placeholder=" &#xf041; Enter location"
                                />
                            </form>
                            </Col>

                            <Col size="sm-2">
                            <form>   
                            <FormBtn onClick={this.handleFormSubmit}><span className="glyphicon glyphicon-search"></span></FormBtn>
                            </form>
                            </Col>

                            <Col size="sm-1"></Col>
                          
                    </div>

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
                            <div className="row text-center">
                                <h1 className="subheading">Search Result</h1>
                            </div>
                        )} 


                    
            </Container>
            </div>
        );
    }
}

export default Home;
