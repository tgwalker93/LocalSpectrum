import React, { Component } from "react";

import { Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Redirect } from 'react-router-dom'

import API from "../../utils/API";


class Register extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        username: "",
        password: "",
        confirmPassword: ""
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

    login = event => {

    }

    // Then reload books from the database
    createAccount = event => {
        console.log("i'm in handleFormSubmit")
        event.preventDefault();
        if (this.state.username && this.state.password) {
            API.saveUser({
                username: this.state.username,
                password: this.state.password
            }).then(this.routeToProfile("tgwalk"))
                .catch(err => console.log(err));
        }
    };
    routeToProfile(username) {
        console.log("i'm in routeToProfile");
        this.props.history.push("/profile/" + username)
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <div className="col-sm-3 hidden-xs"></div>
                    <div className="col-sm-6">
                        
                        <form className="login">
                            <p>Username</p>
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="&#xf007; USERNAME"
                            />
                            <p>Password</p>
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                type="password"
                                placeholder="&#xf023; PASSWORD"
                            />
                            <p>Confirm Password</p>
                            <Input
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChange}
                                name="confirmPassword"
                                type="password"
                                placeholder="&#xf023; CONFIRM PASSWORD"
                            /> 
                            <button className="btn btn-success loginBtn"
                                onClick={this.login}
                            >
                                Log in
                            </button>

                            <button className="btn btn-success registerBtn"
                                onClick={this.createAccount}
                            >
                                Register
                            </button>

                        </form>
                    </div>
                    <div className="col-sm-3 hidden-xs"></div>
                </Row>
            </Container>
        );
    }
}

export default Register;
