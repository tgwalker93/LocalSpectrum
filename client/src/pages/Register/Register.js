import { Row, Container } from "../../components/Grid";
import { InputLog } from "../../components/LoginItem";


import React, { Component } from "react";

import { BrowserRouter as Redirect } from 'react-router-dom'
import API from "../../utils/API";

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
			redirectTo: null
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
		if (this.state.username && this.state.password) {
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
								<InputLog
									value={this.state.username}
									onChange={this.handleInputChange}
									name="username"
									placeholder="&#xf007; USERNAME"
								/>
								<p>Password</p>
								<InputLog
									value={this.state.password}
									onChange={this.handleInputChange}
									name="password"
									type="password"
									placeholder="&#xf023; PASSWORD"
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


								<button className="btn btn-warning registerBtn"
									onClick={this.handleSubmit}
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