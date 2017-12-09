import React, { Component } from "react";
// import Jumbotron from "../../components/Jumbotron";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import ReviewBtn from "../../components/ReviewBtn";
import NextBtn from "../../components/NextBtn";
import PreBtn from "../../components/PreBtn";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import Modal from 'react-modal';
import { CusContainer, CusItem } from "../../components/CustomerImage";
import Rating from "../../components/Rating";
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
        // height: '400px',
        // width: '600px',
        // position: 'fixed',
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',
        // zIndex: '1000',
        // overflow: 'auto',
        // backgroundColor: 'rgba(255,255,255,0.8)',
        // border: '1.5px solid #FF1F99',
      
    }
};

let testObj = {
    name: "test"
}

class Home extends Component {
    // Setting our component's initial state
    state = {
        postReviews: [],
        itemReview: "",
        currentReview: null,
        currentItemReview: [],
        search: "",
        location: "",
        items: [],
        isModalOpen: false
    };

    // When the component mounts, load all books and save them to this.state.books
    componentDidMount() {
        Modal.setAppElement('body');
    }

    ///MODALLLLLLLLLL
    openModal(review, e) {
        this.setState({isModalOpen: true});
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


    postReview() {
        let currentReview = this.state.currentReview;
        currentReview.itemReview = this.state.itemReview;
        if (this.state.itemReview) {
            API.postReview(currentReview)
                .then(res => this.renderArticleNotes(this.state.currentReview))
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
                        <div style={{marginLeft:-12, marginBottom: 15}}>
                        <Rating />
                        </div>
                        <div>
                            <textarea className='reviewArea' placeholder=' Your reviews help others to learn more about great local goodies.' rows='6' cols='60' maxLength="5000"
                                value={this.state.itemReview}
                                onChange={this.handleInputChange}
                                name="itemReview">
                            </textarea>
                        </div>
                        <button className='postReview' onClick={() => this.postReview()}>Post Review</button>
                        {/* <button className='btn btn-danger note-delete noteModal' onClick={() => this.closeModal()}>X</button> */}

                    </div>
                    {/* {this.state.currentArticleNotes.length ? (
                        <NoteContainer>
                            <div className="articleNoteContainer">
                                {this.state.currentArticleNotes.map(note => {
                                    let boundNoteClick = this.deleteNote.bind(this, note);
                                    return (
                                        <NotePanel key={note._id} noteText={note.noteText}>
                                            <div>
                                                <button className='btn btn-danger note-delete insideNote' onClick={boundNoteClick}> X </button>
                                            </div>
                                        </NotePanel>
                                    );
                                })}
                            </div>
                        </NoteContainer> 
                     ) : (
                            <h3> There are no saved notes! </h3>
                        )}  */}
                </Modal>

                <Nav />
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
                                    return (

                                        <CusItem  key={item.itemName} itemName={item.itemName} itemSummary={item.itemSummary} itemImage={item.itemImage} index={i} >
                                        

                                        <ReviewBtn onClick={boundItemClick} />

                                        {/* <PreBtn style={{marginRight: 20}}/><NextBtn />  */}
                                        
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
