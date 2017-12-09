import React, { Component } from "react";
import { Row, Container } from "../../components/Grid";
import { TextLog, InputLog } from "../../components/LoginItem";
// import API from "../../utils/API";
import "./Contact.css";


class Contact extends Component {
    // Setting our component's initial state
    state = {
        name: "",
        email: "",
        comment: ""
    };

    // Handles updating component state when the user types into the input field
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div>
                <Container>
                   
                        <Row>
                            <div className="col-sm-5 contactLeft">
                                <h2>Contact Us</h2>
                                <p className="subTitle">We will get back to you as soon as possible!!!!</p>
                                <hr />
                                <h4><span><i className="fa  fa-map-marker fa-1x contactIcon" aria-hidden="true"></i></span> Irvine, Orang County</h4>
                                <h4><span><i className="fa  fa-envelope fa-1x contactIcon" aria-hidden="true"></i></span> localspectrum@mail.com</h4>
                                <h4><span><i className="fa  fa-volume-control-phone fa-1x contactIcon" aria-hidden="true"></i></span> 888-LocalSpectrum</h4>
                            </div>

                            <div className="col-sm-7 contactRight">
                                <div className="row">
                                    <div className="col-sm-6">   
                                        <InputLog
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                            name="name"
                                            placeholder="&#xf2ba; Name"
                                        />
                                    </div>
                                    <div className="col-sm-6">
                                        
                                        <InputLog
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                            name="email"
                                            placeholder="&#xf003; Email"
                                        />
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-sm-12">
                                        
                                        <TextLog
                                            value={this.state.comment}
                                            onChange={this.handleInputChange}
                                            name="comment"
                                            placeholder="&#xf0f6; Comment"
                                        />
                                    </div>
                                </div>

                                <button className="btn btn-warning contactBtn"
                                    onClick={this.sendEmail}
                                >
                                    SEND
                                </button>
                            </div>

                        </Row>
                </Container>
            </div>
        );
    }
}

export default Contact;
