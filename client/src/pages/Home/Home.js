import React, { Component } from "react";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import ReviewBtn from "../../components/ReviewBtn";
import API from "../../utils/API";
import Modal from 'react-modal';
import { CusContainer, CusItem } from "../../components/CustomerImage";
import StarRatingComponent from 'react-star-rating-component';
import "./Home.css";


let testObj = {
    name: "test"
}


let reviewObj = {
    comment: "",
    rating: null
}
class Home extends Component {
    // Setting our component's initial state
    state = {
        searchStart: false,
        postReviews: [],
        user: null,
        itemReview: "",
        currentReview: null,
        currentItemReview: [],
        search: "",
        location: "",
        city: "",
        state: "",
        searchValid: false,
        locationValid: false,
        cityValid: false,
        stateValid: false,
        formErrors: { search: "", location: "", city: "", state: "" },
        items: [],
        currentItem: null,
        isModalOpen: false,
        rating_empty_initial: 0,
        rating: 0,
        averageRating: 0
    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
        Modal.setAppElement('body');
    };


    componentWillReceiveProps(nextProps) {

        if (nextProps.user) {
            this.setState({ user: nextProps.user })
        }
    };
    ///MODAL
    openModal(item, e) {
        this.setState({ isModalOpen: true, currentItem: item });
    };
    closeModal(testObj) {
        this.setState({ isModalOpen: false });
    };


    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    //This will post review
    postReview(reviewObj) {
        reviewObj.comment = this.state.itemReview;
        reviewObj.rating = this.state.rating;
        reviewObj.currentItem = this.state.currentItem;
        reviewObj.userObj = this.state.user;

 
        API.postReview(reviewObj)
            .then(res => {
              
               
                this.closeModal({});
              
            })
            .catch(err => console.log(err));
    };
    //This function will loop through data returned from db within range and find anything relevant to search term.
    findText(res, search) {
        let geoResults = res.data.geoResults
        let searchResults = [];
        this.setState({
            geoResults: geoResults,
            
        });


        geoResults.forEach(function (returnedItem) {
            if (returnedItem.properties.itemName === search) {
                returnedItem.fromGoogle = false;
                searchResults.push(returnedItem);
            }
        });
        
        searchResults.forEach(function(returnedItem, i){
            let total = 0;
            let avg = 0;
            let count = 0;
            returnedItem.properties.itemReviews.forEach(function(review){
                if(review.rating){
                    count += 1;
                    total+= review.rating;
                }
            })
            avg = total/count
            searchResults[i].averageRating = avg;
            
        })

  
        if(searchResults.length===0){
            this.setState({
                searchStart: "No Items Found"
            })
            // API.searchGoogle(this.state.search, this.state.location);
        }
        this.setState({
            items: searchResults
        })

    };

    onStarClickEmptyInitial(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({ rating_empty_initial: nextValue, rating: nextValue});
    };

    //If no search results returned, here are yelp results. 
    searchGoogle(searchStr, location2) {
        console.log("I'm in search Google on the front-end");
        console.log(searchStr);
        console.log(location2);
        API.searchGoogle({
            search: searchStr,
            location: location2
        })
        .then(res => {
            console.log("I've completed searchGoogle and i'm on the client. Here is res");
            console.log(res);
            for(var i =0; i<res.data.results.length; i++) {
            var itemObj = {
                _id: res.data.results[i].id,
                fromGoogle: true,
                properties: {
                    itemName: res.data.results[i].name,
                    averageRating: res.data.results[i].rating,
                    itemSummary: "Google Results",
                    itemImage: res.data.results[i].photos[0].icon
                }
            }
        }
            this.state.items.push(itemObj);
            this.setState({
                items: this.state.items
            });
            console.log(this.state.items);
         })
         .catch(err => console.log(err));
    };
    //"has-error" is a default bootstrap class that will nicely color the outline of the field red to indicate an error for the user. 
    errorClass(error) {
        return (error.length === 0 ? "" : "has-error");
    }

    validateFields(event) {
        event.preventDefault();
        let fieldValidationErrors = this.state.formErrors;

        let searchValid = this.state.searchValid;
        let cityValid = this.state.cityValid;
        let stateValid = this.state.stateValid;





        searchValid = this.state.search.length > 0;
        fieldValidationErrors.search = searchValid ? "" : "Please provide your search";

        cityValid = this.state.city.length > 0;
        fieldValidationErrors.city = cityValid ? "" : "Please provide your city";

        stateValid = this.state.state.length > 0;
        fieldValidationErrors.state = stateValid ? "" : "Please provide your state";


        this.setState({
            formErrors: fieldValidationErrors,
            searchValid: searchValid,
            cityValid: cityValid,
            stateValid: stateValid,
            location: this.state.city + ", " + this.state.state

        }, () => {
            console.log("i'm going to call handle form submit.");
            this.handleFormSubmit();
        });
    }
    handleFormSubmit() {
        this.setState({searchStart: true});

        console.log("I'm in handle form submit.");
        if (this.state.searchValid && this.state.cityValid && this.state.stateValid) {
            console.log("Handle form submit valid");
            // this.searchGoogle(this.state.search, this.state.location);
            //API call to search term in DB
            API.search({
                search: this.state.search,
                location: this.state.location
            }).then(res => {
                    // this.findText(res, this.state.search);
                    console.log("local search was successful, trying google search now!");
                    this.searchGoogle(this.state.search, res.data.location[0].geometry.location);
                    
                })
                .catch(err => console.log(err));








            }
        
    };


    render() {
        return (
            <div>

            
                    <Modal className="modalStyling"
                        isOpen={this.state.isModalOpen}
                
                    >

                        <button className='closeModal' onClick={this.closeModal.bind(this, testObj)}> x </button>

                        <h1 className="item-name"> Item Name {this.state.itemName}</h1>
                        <div className='containertext-center'>
                            <div style={{ marginLeft: -12, marginBottom: 15 }}>
                                <div className="starRating">
                                    <StarRatingComponent
                                        name={`star${this.props.index}`}
                                        value={this.state.rating_empty_initial}
                                        onStarClick={this.onStarClickEmptyInitial.bind(this)}
                                    />
                                </div>
                            </div>
                            <div>
                                <textarea className='reviewArea' placeholder=' Your reviews help others to learn more about great local goodies.' rows='6' cols='60' maxLength="5000"
                                    value={this.state.itemReview}
                                    onChange={this.handleInputChange}
                                    name="itemReview">
                                </textarea>
                            </div>
                        <button className='postReview' onClick={this.postReview.bind(this, reviewObj)}>Post Review</button>

                        </div>
                    </Modal>
                <Container fluid>
                                            

                    <Row>
               
                      < Hero backgroundImage = "./map4.jpg" />
                    </Row>
                    <div className="row inputBox">
                        <Col size="sm-1"></Col>
                        <Col size="sm-6">
                            <form onSubmit={e => { e.preventDefault(); }}> 
                                <Input fielderror={this.state.formErrors.search}
                                    formgroupclass={`form-group ${this.errorClass(this.state.formErrors.search)}`}
                                    value={this.state.search} id="search"
                                    onChange={this.handleInputChange.bind(this)}
                                    placeholder=" &#xf002; Search for your local goodies"
                                    name="search"></Input>

                            </form>
                        </Col>

                        <Col size="sm-2">
                            <form onSubmit={e => { e.preventDefault(); }}>
                                <Input fielderror={this.state.formErrors.city}
                                    formgroupclass={`form-group ${this.errorClass(this.state.formErrors.city)}`}
                                    value={this.state.city} id="city"
                                    onChange={this.handleInputChange.bind(this)}
                                    placeholder=" &#xf041; Enter City"
                                    name="city"></Input>
                            </form>
                        </Col>
                        <Col size="sm-1">
                            <form onSubmit={e => { e.preventDefault(); }}>
                                <Input fielderror={this.state.formErrors.state}
                                    formgroupclass={`form-group ${this.errorClass(this.state.formErrors.state)}`}
                                    value={this.state.state} id="state"
                                    onChange={this.handleInputChange.bind(this)}
                                    placeholder=" &#xf041; Enter State"
                                    name="state"></Input>
                            </form>
                        </Col>                       

                        <Col size="sm-1">
                            <form onSubmit={e => { e.preventDefault(); }}>
                                <FormBtn onClick={this.validateFields.bind(this)}><span className="glyphicon glyphicon-search"></span></FormBtn>
                            </form>
                        </Col>

                        <Col size="sm-1"></Col>

                    </div>
                    {this.state.items.length ? (
                        <CusContainer>
                            <div>
                                {this.state.items.map((item, i) => {
                                    let boundItemClick = this.openModal.bind(this, item);
                                        
                                    return (
                                        
                                        <CusItem  key={item._id} itemId={item._id}  fromGoogle={item.fromGoogle} itemName={item.properties.itemName} itemSummary={item.properties.itemSummary} itemImage={item.properties.itemImage} averageRating={item.averageRating} index={i} >
                                        

                                        <ReviewBtn onClick={boundItemClick} />
                                        
                                        </CusItem>

                                    );
                                })}
                            </div>
                        </CusContainer>
                    ) : (

                            //If user search returns none, "no results found", if user hasn't searched yet, let empty
                            <div className="row text-center">
                                <h1 className="subheading">{this.state.searchStart}</h1>
                            </div>



                        )}



                </Container>
            </div>


        );

    }
}

export default Home;
