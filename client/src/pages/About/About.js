import React, { Component } from "react";
import Hero from "../../components/Hero";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
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

                </Container>
            </div>
        );
    }
}

export default About;
