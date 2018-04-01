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
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.user) {
            this.setState({ user: nextProps.user })
        }
    }
    ///MODAL
    openModal(item, e) {
        this.setState({ isModalOpen: true, currentItem: item });
    }
    closeModal(testObj) {
        this.setState({ isModalOpen: false });
    }


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
    }
    //This function will loop through data returned from db within range and find anything relevant to search term.
    findText(res, search) {
        let geoResults = res.data.geoResults
        let searchResults = [];
        this.setState({
            geoResults: geoResults,
            
        });


        geoResults.forEach(function (returnedItem) {
            if (returnedItem.properties.itemName === search) {
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
        }
        this.setState({
            items: searchResults
        })

    }

    onStarClickEmptyInitial(nextValue, prevValue, name) {
        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        this.setState({ rating_empty_initial: nextValue, rating: nextValue});
    }

    // Then reload books from the database
    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({searchStart: true});

        if (this.state.search) {
            API.search({
                search: this.state.search,
                location: this.state.location
            })
                .then(res => {
                    this.findText(res, this.state.search);
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
               
                            <img id="hero2" src="./assets/img/map3.jpg" alt="test" />

                        {/* <Hero backgroundImage="/assets/img/map3.jpg" /> */}
                 
            
                    </Row>
                    <div className="row inputBox">
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
                        <CusContainer>
                            <div>
                                {this.state.items.map((item, i) => {
                                    let boundItemClick = this.openModal.bind(this, item);
                                    return (
                                        
                                        <CusItem  key={item._id} itemId={item._id} itemName={item.properties.itemName} itemSummary={item.properties.itemSummary} itemImage={item.properties.itemImage} averageRating={item.averageRating} index={i} >
                                        

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
