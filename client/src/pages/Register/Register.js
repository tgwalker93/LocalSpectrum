import { Row, Container } from "../../components/Grid";
import { InputLog } from "../../components/LoginItem";
import {Input } from "../../components/Form";
import React, { Component } from "react";
import { BrowserRouter as Redirect } from 'react-router-dom'
import API from "../../utils/API";
import "./Register.css";

class Register extends Component {
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
	constructor() {
		super()
		this.state = {
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
			confirmPassword: "",
			redirectTo: null,
			formErrors: { firstName: "", lastName: "", username: "", password: "", city: "", state:"" },
			firstNameValid: false,
			lastNameValid: false,
			usernameValid: false,
			passwordValid: false,
			cityValid: false,
			stateValid: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleInputChange.bind(this)
	}
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		
		if (this.state.usernameValid && this.state.passwordValid && this.state.firstNameValid && this.state.lastNameValid && this.state.cityValid && this.state.stateValid) {
		let userObj = {
			userId: null,
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
		API.signUp(userObj)
			.then(response => {
			
	
		
				if (!response.data.error) {
					userObj.userId = response.data.doc._id;
					this.props._login(this.state.username, this.state.password, userObj);
					this.setState({
						redirectTo: '/profile'
					})
				} else {
					this.setState({errorResponse: response})
				}
			})

		}
	}
	//"has-error" is a default bootstrap class that will nicely color the outline of the field red to indicate an error for the user. 
	errorClass(error) {
		return (error.length === 0 ? "" : "has-error");
	}

	validateFields(event) {
		event.preventDefault();
		let fieldValidationErrors = this.state.formErrors;
	
		let firstNameValid = this.state.firstNameValid;
		let lastNameValid = this.state.lastNameValid;
		let usernameValid = this.state.usernameValid;
		let passwordValid = this.state.passwordValid;
		let cityValid = this.state.cityValid;
		let stateValid = this.state.stateValid;




		//Validating Fields by checking if there is anything there.
		firstNameValid = this.state.firstName.length > 0;
		fieldValidationErrors.firstName = firstNameValid ? "" : "Please provide your first name";

		
		lastNameValid = this.state.lastName.length > 0;
		fieldValidationErrors.lastName = lastNameValid ? "" : "Please provide your last name";

		usernameValid = this.state.username.length >0;
		fieldValidationErrors.username = usernameValid ? "" : "Please provide your username";

		passwordValid = this.state.password.length > 0;
		fieldValidationErrors.password = passwordValid ? "" : "Please provide your password";

		cityValid = this.state.city.length > 0;
		fieldValidationErrors.city = cityValid ? "" : "Please provide your city";
		
		stateValid = this.state.state.length > 0;
		fieldValidationErrors.state = stateValid ? "" : "Please provide your state";




		this.setState({
			formErrors: fieldValidationErrors,
			firstNameValid: firstNameValid,
			lastNameValid: lastNameValid,
			usernameValid: usernameValid,
			passwordValid: passwordValid,
			cityValid: cityValid,
			stateValid
	
		}, () => {
			this.handleSubmit.bind(this);
		});
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div>
				<Container fluid>
			
					<Row>
						<h1>{this.state.errorResponse} </h1> 
						<div className="col-sm-3 hidden-xs"></div>
						<div className="col-sm-6">
							<form className="login">

								<p>Username</p>
								<Input fielderror={this.state.formErrors.username}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.username)}`}
									value={this.state.username} id="username"
									onChange={this.handleInputChange.bind(this)}
									name="username"></Input>
								<p>Password</p>
								<Input fielderror={this.state.formErrors.password}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.password)}`}
									value={this.state.password} id="password"
									onChange={this.handleInputChange.bind(this)}
									name="password"></Input>
								<p>First Name</p>
								<Input fielderror={this.state.formErrors.firstName} 
								formgroupclass={`form-group ${this.errorClass(this.state.formErrors.firstName)}`} 
								value={this.state.firstName} id="firstName" 
								onChange={this.handleInputChange.bind(this)} 
								name="firstName"></Input>

								<p>Last Name</p>
								<Input fielderror={this.state.formErrors.lastName}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.lastName)}`}
									value={this.state.lastName} id="lastName"
									onChange={this.handleInputChange.bind(this)}
									name="lastName"></Input>
								<p> City</p>
								<Input fielderror={this.state.formErrors.city}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.city)}`}
									value={this.state.city} id="city"
									onChange={this.handleInputChange.bind(this)}
									name="city"></Input>
								<p> State</p>
								<Input fielderror={this.state.formErrors.state}
									formgroupclass={`form-group ${this.errorClass(this.state.formErrors.state)}`}
									value={this.state.state} id="state"
									onChange={this.handleInputChange.bind(this)}
									name="state"></Input>


								<button className="btn btn-warning registerBtn"
									onClick={this.validateFields.bind(this)}
								>
									Register
                            </button>

							</form>
						</div>
						<div className="col-sm-3 hidden-xs"></div>
					</Row>
				</Container>
			</div>
		)
	}
}

export default Register