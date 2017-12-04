import React, { Component } from "react";

import { Row, Container } from "../../components/Grid";
import { InputLog, LogBtn } from "../../components/LoginItem";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Redirect } from 'react-router-dom'
import Nav from "../../components/Nav";
import API from "../../utils/API";


class Register extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        username: "",
        password: "",
        address: "",
        city: "",
        state: "",
        firstName: "",
        lastName: "",
        email: "",
        businessName: "",
        zip: "",
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
        console.log("i'm in Create Account function!")
        event.preventDefault();
        // this.state.username && this.state.password && this.state.address && this.state.city && this.state.state && this.state.zip
        if (this.state.username && this.state.password) {
            let userObj = {
                username: this.state.username,
                password: this.state.password,
                user_email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                user_address: this.state.address,
                user_city: this.state.city,
                user_state: this.state.state,
                user_zip: this.state.zip
            }
            API.saveUser(userObj).then( res => 
                    {
                    console.log("After save user is done");
                    console.log(res);
                    this.setState({ user: res.data })
                    this.routeToProfile(this.state.user.doc._id)

                    }
            
            )
                .catch(err => console.log(err));
        }
    };
    routeToProfile(id) {
        console.log("i'm in routeToProfile");
        this.props.history.push("/profile/" + id)
    }

    render() {
        return (
            <div>
                <Nav />
            <Container fluid>
                <Row>
                    <div className="col-sm-3 hidden-xs"></div>
                    <div className="col-sm-6">
                        
                        <form className="login">
                            <p>Username</p>
                            <InputLog
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="&#xf007; USERNAME"
                            />
                            <p>Email</p>
                            <InputLog
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="email"
                            />
                            <p>Password</p>
                            <InputLog
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                type="password"
                                placeholder="&#xf023; PASSWORD"
                            />
                            <p>Confirm Password</p>
                            <InputLog
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChange}
                                name="confirmPassword"
                                type="password"
                                placeholder="&#xf023; CONFIRM PASSWORD"
                            /> 
                            <p>First Name</p>
                            <InputLog
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                name="firstName"
                                placeholder="&#xf007; First Name"
                            />
                            <p>Last Name</p>
                            <InputLog
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                name="lastName"
                                placeholder="&#xf007; Last Name"
                            />
                            <p>Business Name (if applicable)</p>
                            <InputLog
                                value={this.state.businessName}
                                onChange={this.handleInputChange}
                                name="businessName"
                                placeholder="&#xf007; businessName"
                            />
                            <p> Address </p>
                            <InputLog
                                value={this.state.address}
                                onChange={this.handleInputChange}
                                name="address"
                                placeholder="101 Cool Street"
                            />
                            <p> City</p>
                            <InputLog
                                value={this.state.city}
                                onChange={this.handleInputChange}
                                name="city"
                                placeholder="Irvine"
                            />
                            <p> State</p>
                            <InputLog
                                value={this.state.state}
                                onChange={this.handleInputChange}
                                name="state"
                                placeholder="California"
                            />
                            <p> Zip</p>
                            <InputLog
                                value={this.state.zip}
                                onChange={this.handleInputChange}
                                name="zip"
                                placeholder="12345"
                            />
                            <button className="btn btn-warning loginBtn"
                                onClick={this.login}
                            >
                                Log in
                            </button>

                            <button className="btn btn-warning registerBtn"
                                onClick={this.createAccount}
                            >
                                Register
                            </button>

                        </form>
                    </div>
                    <div className="col-sm-3 hidden-xs"></div>
                </Row>
            </Container>
        </div>
        );
    }
}

export default Register;
