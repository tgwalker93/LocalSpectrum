import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import NavAfter from "./components/NavAfter";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import axios from 'axios'
import API from "./utils/API";
import { Redirect } from 'react-router-dom'

// const App = () => {
//   if (props.loggedIn) {
//   return (
//   <Router>
//     <div>
//       {/* <Nav /> */}
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/books" component={Books} />
//         <Route exact path="/profile" component={Profile} />
//         <Route exact path="/about" component={About} />
//         <Route exact path="/contact" component={Contact} />
//         <Route exact path="/login" component={Login} />
//         <Route exact path="/register" component={Register} />
//         <Route exact path="/profile/:id" component={Profile} />
//         <Route component={Home} />
//       </Switch>
//       <Footer />
//     </div>
//   </Router>);

// }
// }

// export default App;

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: "null nully null null"
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		API.getUser().then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: response.data.user
				})
			}
		})
		console.log("componemt")
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		console.log("username: " + username)
		API.loginUser({
			username,
			password
		}).then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
					console.log("this.state.user._id: " + this.state.user._id)
				}
			})
	}

	render() {
		return (
			<div className="App">
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
				
				<Route exact path="/Profile" render={() => <Profile user={this.state.user} />} />
				<Route exact path="/About" render={() => <About user={this.state.user} />} />
				<Route exact path="/register" component={Register} />
				{/* <LoginForm _login={this._login} /> */}
				<Footer />
			</div>
		)
	}
}

export default App