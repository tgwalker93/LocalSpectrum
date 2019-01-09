
import NavAfter from "./components/NavAfter";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ItemPage from "./pages/ItemPage";
import API from "./utils/API"
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import "./App.css";

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
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		API.user().then(response => {
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user,
					userId: response.data.user._id,
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		var userData = {
			username: username,
			password: password,
		}
		API
			.login(userData)
			.then(response => {
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
				<Route exact path="/itemPage/:itemId?" component={ItemPage} />
				<Footer />
			</div>
		)
	}
}

export default App
