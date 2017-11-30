import React, { Component } from "react";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import API from "../../utils/API";
import "./About.css";
import { Link } from "react-router-dom";




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
                            <p className="subTitle">Discovering and sharing your passionate just get easier</p>
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

                 
                        <div className="text-center">
                            <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-2 iconBox first">
                                <img src="/assets/img/tyler.jpg" className="img-circle img-responsive" alt="Tyler" width="90%" height="90%" />
                                <h3 style={{ color: "#09B0FF" }}>Tyler Walker</h3>
                                <p>Mern | Node Developer</p>
                                <hr style={{  borderTop: "1px solid #09B0FF" }}/>
                                <div className="row">
                                    <div className="col-xs-3"></div>
                                    <div className="col-xs-3">
                                    <Link to="https://www.linkedin.com/in/tyler-walker-52aa6471/" target="blank"><i style={{ color: "#09B0FF" }} className="fa fa-linkedin socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3">
                                    <Link to="https://github.com/tgwalker93" target="blank"><i style={{ color: "#09B0FF" }} className="fa fa-github socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3"></div>
                                </div>
                            </div>

                            <div className="col-sm-2 iconBox second">
                                <img src="/assets/img/tammy.jpg" className="img-circle img-responsive " alt="Tammy" width="90%" height="90%" />
                                <h3 style={{ color: "#FF7D18" }}>Tammy Le</h3>
                                <p>Front-end UX/UI Developer </p>
                                <hr style={{  borderTop: "1px solid #FF7D18" }}/>
                                <div className="row">
                                    <div className="col-xs-3"></div>
                                    <div className="col-xs-3">
                                    <Link to="https://www.linkedin.com/in/tammyle245/" target="blank"><i style={{ color: "#FF7D18" }} className="fa fa-linkedin socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3">
                                    <Link to="https://github.com/letam245" target="blank"><i style={{ color: "#FF7D18" }} className="fa fa-github socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3"></div>
                                </div>
                            </div>
                            <div className="col-sm-2 iconBox third">
                                <img src="/assets/img/omar.jpg" className="img-circle img-responsive " alt="Omar" width="90%" height="90%" />
                                <h3 style={{ color: "#41BA59" }}>Omar Solis</h3>
                                <p>API | Authentication Developer</p>
                                <hr style={{  borderTop: "1px solid #41BA59" }}/>
                                <div className="row">
                                    <div className="col-xs-3"></div>
                                    <div className="col-xs-3">
                                    <Link to="https://www.linkedin.com/in/omarsolisoc/" target="blank"><i style={{ color: "#41BA59" }} className="fa fa-linkedin socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3">
                                    <Link to="https://github.com/Yakoloi" target="blank"><i style={{ color: "#41BA59" }} className="fa fa-github socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3"></div>
                                </div>
                            </div>
                            <div className="col-sm-2 iconBox four">
                                <img src="/assets/img/prathihia.jpg" className="img-circle img-responsive" alt="Prathiha" width="90%" height="90%" />
                                <h3 style={{ color: "#FF1F99" }}>Prathibha Chunchu</h3>
                                <p>Front-end | API Developer </p>
                                <hr />
                                <div className="row">
                                    <div className="col-xs-3"></div>
                                    <div className="col-xs-3">
                                    <Link to="https://www.linkedin.com/in/prathibha-chunchu-224b1a16/" target="blank"><i style={{ color: "#FF1F99" }} className="fa fa-linkedin socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3">
                                    <Link to="https://github.com/chunchuprati" target="blank"><i style={{ color: "#FF1F99" }} className="fa fa-github socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3"></div>
                                </div>
                            </div>
                            <div className="col-sm-2 iconBox five">
                                <img src="/assets/img/matthew.jpg" className="img-circle img-responsive " alt="Prathiha" width="90%" height="90%" />
                                <h3 style={{ color: "#36ECFF" }}>Matthew Belanic</h3>
                                <p>Back-end | Data Developer</p>
                                <hr style={{  borderTop: "1px solid #36ECFF" }}/>
                                <div className="row">
                                    <div className="col-xs-3"></div>
                                    <div className="col-xs-3">
                                    <Link to="https://www.linkedin.com/in/mjbelanic/" target="blank"><i style={{ color: "#36ECFF" }} className="fa fa-linkedin socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3">
                                    <Link to="https://github.com/mjbelanic" target="blank"><i style={{ color: "#36ECFF" }} className="fa fa-github socialIcon" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="col-xs-3"></div>
                                </div>
                            </div>
                            <div className="col-sm-1"></div>
                        </div>
                        </div>
                 







                </Container>
            </div>
        );
    }
}

export default About;
