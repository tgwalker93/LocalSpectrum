import {Row, Container } from "../../components/Grid";
import { InputLog} from "../../components/LoginItem";
import { Input } from "../../components/Form";
import "./Login.css";


// export default Login;

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


class Login extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			usernameValid: false,
			passwordValid: false,
			formErrors: {username: "", password: "" },
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/profile'
		})
	}
	//"has-error" is a default bootstrap class that will nicely color the outline of the field red to indicate an error for the user. 
	errorClass(error) {
		return (error.length === 0 ? "" : "has-error");
	}

	validateFields(event) {
		event.preventDefault();
		let fieldValidationErrors = this.state.formErrors;

		let usernameValid = this.state.usernameValid;
		let passwordValid = this.state.passwordValid;






		usernameValid = this.state.username.length > 0;
		fieldValidationErrors.username = usernameValid ? "" : "Please provide your username";

		passwordValid = this.state.password.length > 0;
		fieldValidationErrors.password = passwordValid ? "" : "Please provide your password";






		this.setState({
			formErrors: fieldValidationErrors,
			usernameValid: usernameValid,
			passwordValid: passwordValid

		}, () => {
			this.handleSubmit.bind(this);
		});
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<Container fluid>
                    <Row>
                        <div className="col-sm-3 hidden-xs"></div>
                        <div className="col-sm-6">

                            <form className="login">
                                <p>Username</p>
								<Input fielderror={this.state.formErrors.username}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.username)}`}
									value={this.state.username} id="username"
									onChange={this.handleChange.bind(this)}
									name="username"></Input>
                                <p>Password</p>
								<Input fielderror={this.state.formErrors.password}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.password)}`}
									value={this.state.password} id="password"
									onChange={this.handleChange.bind(this)}
									name="password"></Input>
                                <button className="btn btn-warning loginBtn"
                                    onClick={this.validateFields.bind(this)}
                                >
                                Log in
                                </button>

                            </form>
                        </div>
                        <div className="col-sm-3 hidden-xs"></div>
                    </Row>
                </Container>
			)
		}
	}
}

export default Login