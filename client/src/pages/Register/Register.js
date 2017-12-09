// import React, { Component } from "react";

import { Row, Container } from "../../components/Grid";
import { InputLog } from "../../components/LoginItem";


import React, { Component } from "react";

// import { Link } from "react-router-dom";
// import { BrowserRouter as Router } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
// import Nav from "../../components/Nav";
// import API from "../../utils/API";
import axios from 'axios'

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
		axios
			.post('/auth/signup', {
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
                console.log(response)
                console.log(response.data.error)
				if (!response.data.error) {
					console.log('youre good')
					this.setState({
						redirectTo: '/profile'
					})
				} else {
					console.log('duplicate')
				}
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div>
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