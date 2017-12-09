import { BrowserRouter as Router, Switch } from "react-router-dom";
import NavAfter from "./components/NavAfter";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import API from "./utils/API"

import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (	
      <NavAfter user={props} _logout={props._logout} />
		)
	} else {
		return (
      <Nav />
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null,
			userId: null
		}
		// this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		console.log("CHECKING IF THERE IS A USER");
		API.user().then(response => {
			console.log(response.data.user)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user,
					userId: response.data.user._id,
				}); console.log(this.state.loggedIn)
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		console.log("attempting login of: " + username + " : " + password)
		var userData = {
			username: username,
			password: password,
		}
		API
			.login(userData)
			.then(response => {
				console.log("------response------")
				console.log(response.data)
				console.log(response.data.user._id)
				console.log(response.data.user.geometry.coordinates)
				console.log("-----------")
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user,
						userId: response.data.user._id,
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				<DisplayLinks user={this.state.user} _logout={this._logout} loggedIn={this.state.loggedIn } />
				{/* LINKS to our different 'pages' */}
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}

				<Route exact path="/" render={() => <Home user={this.state.user} />} />
				<Route
					exact
					path="/login"
					render={() =>
						<Login
							_login={this._login}
							
						/>}
				/>
				<Route exact path="/profile" render={() => <Profile loggedIn={this.state.loggedIn} user={this.state.user} />} />
				<Route exact path="/register"
				render={() =>
						<Register
							_login={this._login}
							
						/>} />
        		<Route exact path="/about" component={About} />
				<Route exact path="/contact" component={Contact} />
				<Footer />
			</div>
		)
	}
}

export default App
