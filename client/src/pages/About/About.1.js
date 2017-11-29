import React, { Component } from "react";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import "./About.css";




class About extends Component {

    render() {
        return (
            <div>
                <Nav />
                <Container fluid>
                    <Row>
                        {/* <Hero backgroundImage="https://media.giphy.com/media/3o6gbchrcNIt4Ma8Tu/giphy.gif"> */}
                        <Hero backgroundImage="assets/img/about.jpg">
                            {/* <h1>Spreading words <span className="glyphicon glyphicon-heart"></span> Spreading love</h1>
                        <h2>Explore & Connect</h2> */}
                        </Hero>
                    </Row>
                    <Row>
                        <div className="col-md-12 containerBox inputBox">
                            <div className="col-lg-3">
                                <h1>Wellcome to Local Spectrum</h1>
                            </div>
                            <div className="col-lg-1 hidden-xs hidden-sm hidden-md">
                                <p className="border">&nbsp;</p>
                            </div>
                            <div className="col-lg-8 ">
                                <p className="aboutText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-sm-12 howItWork">
                            <h2>How Local Spectrum work?</h2>
                            <p className="subTitle">Discover and sharing your passionate just get easier</p>
                            <hr className="decoLine" />
                            <div className="col-sm-3">
                                <div className="">
                                    <i className="fa  fa-upload  fa-5x" aria-hidden="true"></i>
                                    <h4 style={{ color: "#09B0FF" }} >Post</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur. </p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="">
                                    <i className="fa fa-search fa-5x" aria-hidden="true"></i>
                                    <h4 style={{ color: "#FF7D18" }} >Search</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur. </p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="">
                                    <i className="fa fa-pencil-square-o fa-5x" aria-hidden="true"></i>
                                    <h4 style={{ color: "#41BA59" }} >Review</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur. </p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="">
                                    <i className="fa fa-users fa-5x" aria-hidden="true"></i>
                                    <h4 style={{ color: "#FF1F99" }} >Connect</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt consectetur. </p>
                                </div>
                            </div>
                            <div className="col-sm-12 getStarted">
                                <hr />
                                <div className="col-sm-3">
                                    <h3>Let's get started!</h3>
                                    <p>Lorem ipsum dolor sit amet</p>
                                </div>
                                <div className="col-sm-3">
                                    <a href="/"><button className="btn btn-primary btn-lg mockBtn1">Search</button></a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="/register"><button className="btn btn-primary btn-lg mockBtn2">Register</button></a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="/login"><button className="btn btn-primary btn-lg mockBtn3">Login</button></a>
                                </div>
                            </div>
                        </div>
                    </Row>

                    <Row>

                        <div className="col-md-12 teamSec">
                            <h1>Let's meet the team</h1>
                        </div>
                    </Row>

                    <Row>
                        <div className="col-sm-12 teamBox text-center">
                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-4 iconBox marginThis">
                                    <img src="/assets/img/tyler.jpg" className="img-circle teamMember" alt="Tyler" width="120" height="120" />
                                    <h3>Tyler Walker</h3>
                                    <p>Back-end Developer </p>
                                </div>


                                <div className="col-sm-4 iconBox">
                                    <img src="/assets/img/tammy.jpg" className="img-circle teamMember" alt="Tammy" width="120" height="120" />
                                    <h3>Tammy Le</h3>
                                    <p>Front-end UX/UI Developer </p>
                                </div>
                                <div className="col-sm-2"></div>
                            
                            </div>

                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-4 iconBox marginThis">
                                    <img src="/assets/img/omar.jpg" className="img-circle teamMember" alt="Omar" width="120" height="120" />
                                    <h3>Omar Solis</h3>
                                    <p>Back-end Developer</p>
                                </div>


                                <div className="col-sm-4 iconBox">
                                    <img src="/assets/img/prathihia.jpg" className="img-circle teamMember" alt="Prathiha" width="120" height="120" />
                                    <h3>Prathibha Chunchu</h3>
                                    <p>Front-end UX/UI Developer </p>
                                </div>
                                <div className="col-sm-2"></div>

                            </div>

                        </div>
                    </Row>







                </Container>
            </div>
        );
    }
}

export default About;
