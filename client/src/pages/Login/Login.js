import React, { Component } from "react";
import GoogleButton from '../../components/GoogleButton'
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API";


class Login extends Component {
    // Setting our component's initial state
    state = {
        search: "",
        username: "",
        password: ""
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
            })
                .then(res => console.log(res + "SUCESSFUL HANDLEFORM SUBMIT"))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <div className="col-sm-3 hidden-xs"></div>
                    <div className="col-sm-6">
                        <GoogleButton>
                        </GoogleButton>
                        <form className="login">
                            Username
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="USERNAME"
                            />
                            Password
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                type="password"
                                placeholder="PASSWORD"
                            />
                            <FormBtn
                                onClick={this.login}
                            >
                                Log in
                            </FormBtn>

                            <FormBtn
                                onClick={this.createAccount}
                            >
                                Create Account
                            </FormBtn>

                        </form>
                        {/* <form>
                            Login
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="search"
                                placeholder="Username"
                            />
                 
                                Password
                            <Input
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                    name="search"
                                    placeholder="Password"
                                />
                       
                                <FormBtn
                                    onClick={this.login}
                                >
                                    Login
                                </FormBtn>
                                <FormBtn
                                    onClick={this.createAccount}
                                >
                                    Create Account
                                </FormBtn>
                           
                        </form> */}
                    </div>
                    <div className="col-sm-3 hidden-xs"></div>
                </Row>
            </Container>
        );
    }
}

export default Login;
