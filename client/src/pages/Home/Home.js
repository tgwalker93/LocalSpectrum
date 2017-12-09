import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import ReviewBtn from "../../components/ReviewBtn";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Modal from 'react-modal';
import { CusContainer, CusItem } from "../../components/CustomerImage";
import NextBtn from "../../components/NextBtn";
import PreBtn from "../../components/PreBtn";
import Rating from "../../components/Rating";
import StarRatingComponent from 'react-star-rating-component';
import "./Home.css";

// MODALLLLLLLLLLLLL
const modalCustomStyles = {
    overlay: {
        // position: 'fixed',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // backgroundColor: 'rgba(255, 255, 255, 0.75)',
        // zIndex: 1000000000000
    },
    content: {
        //Sample Styles
        // height: '800px',
        // width: '800px',
        // position: 'fixed',
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // zIndex: '1000',
        // overflow: 'auto',
        // backgroundColor: '#eb6864'
    }
};

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
        console.log("COMPONENT RECEIVED PROPS )0)))) ) ) ) )")
        console.log(nextProps);
        console.log(nextProps.coordinates)
        console.log("-----nextProps.user-----")
        console.log(nextProps.user)
        console.log("------------------------")
        if (nextProps.user) {
            this.setState({ user: nextProps.user })
            console.log("------this.state.userId------")
            console.log(this.state.user)
            console.log("/------this.state.Id------")
        }
    }
    ///MODALLLLLLLLLL
    openModal(item, e) {
        console.log("below is current item");
        this.setState({ isModalOpen: true, currentItem: item });
        // this.renderArticleNotes(article)
    }
    closeModal(testObj) {
        console.log(testObj)
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
        console.log("I'm in postReview on the front end in home.js!!!! below is the review obj");
        reviewObj.comment = this.state.itemReview;
        reviewObj.rating = this.state.rating;
        reviewObj.currentItem = this.state.currentItem;
        reviewObj.userObj = this.state.user;

        console.log(reviewObj);
        API.postReview(reviewObj)
            .then(res => {
                console.log("API.postReview is completed below!!!!!!");
                console.log(res);
                // this.setState({
                //     items: res.data
                // });
                this.closeModal({});
                // this.findText(res, this.state.search);
            })
            .catch(err => console.log(err));
    }
    //This function will loop through data returned from db within range and find anything relevant to search term.
    findText(res, search) {
        console.log("i'm in findText!!!, below is res.data");
        console.log(res.data)
        let geoResults = res.data.geoResults
        let searchResults = [];
        this.setState({
            geoResults: geoResults,
            
        });
        geoResults.forEach(function (returnedItem) {
            console.log(returnedItem);
            console.log(search);
            if (returnedItem.properties.itemName === search) {
                console.log("SUCCESS");
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

        console.log("COMPLETED FOR LOOP, SETTING STATE");
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
        console.log("BEGIN SEARCH");

        if (this.state.search) {
            API.search({
                search: this.state.search,
                location: this.state.location
            })
                .then(res => {
                    console.log("API.Search has completed, see below")
                    console.log(res);
                    // this.setState({
                    //     items: res.data
                    // });
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
                            {/* <button className='btn btn-danger note-delete noteModal' onClick={() => this.closeModal()}>X</button> */}

                        </div>
                    </Modal>
                <Container fluid>
                    <Row>
                        {/* <Hero backgroundImage="https://media.giphy.com/media/3o6gbchrcNIt4Ma8Tu/giphy.gif"> */}
                        <Hero backgroundImage="assets/img/map3.jpg">
                            {/* <h1>Spreading words <span className="glyphicon glyphicon-heart"></span> Spreading love</h1>
                        <h2>Explore & Connect</h2> */}
                        </Hero>
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
                                    {console.log("I'm RENDERING SEARCHED ITEMS --------------------------------")}
                                    {console.log(item)}
                                    return (
                                        
                                        <CusItem  key={item._id} itemId={item._id} itemName={item.properties.itemName} itemSummary={item.properties.itemSummary} itemImage={item.properties.itemImage} averageRating={item.averageRating} index={i} >
                                        

                                        <ReviewBtn onClick={boundItemClick} />
                                        
                                        </CusItem>

                                    );
                                })}
                            </div>
                        </CusContainer>
                    ) : (
                            <div className="row text-center">
                                <h1 className="subheading"></h1>
                            </div>
                        )}



                </Container>
            </div>


        );

    }
}

export default Home;
