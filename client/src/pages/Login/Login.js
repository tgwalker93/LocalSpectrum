// import React, { Component } from "react";
// import GoogleButton from '../../components/GoogleButton'
// import {Row, Container } from "../../components/Grid";
// import Nav from "../../components/Nav";
// import { InputLog} from "../../components/LoginItem";
 import API from "../../utils/API";


// class Login extends Component {
//     // Setting our component's initial state
//     state = {
//         search: "",
//         username: "",
//         password: "",
//         id: ""
//     };

//     // When the component mounts, load all books and save them to this.state.books
//     componentDidMount() {

//     }

//     // Handles updating component state when the user types into the input field
//     handleInputChange = event => {
//         const { name, value } = event.target;
//         this.setState({
//             [name]: value
//         });
//     };

//     login = event => {

//     }

//     // Then reload books from the database
//     login = event => {
//         console.log("i'm in handleFormSubmit")
//         event.preventDefault();
//         if (this.state.username && this.state.password) {
//             console.log(this.state.username);
//             console.log(this.state.password);
//             API.loginUser({
//                 username: this.state.username,
//                 password: this.state.password
//             })
//                 .then(res => this.routeToProfile(res.data.id))
//                 .catch(err => console.log(err));
//         }
//     };

//     routeToProfile(id) {
//         console.log("i'm in routeToProfile");
//         this.props.history.push("/profile/" + id)
//     }

//     render() {
//         return (
//             <div>
//                 <Nav />
//                 <Container fluid>
//                     <Row>
//                         <div className="col-sm-3 hidden-xs"></div>
//                         <div className="col-sm-6">

//                             <form className="login">
//                                 <p>Username</p>
//                                 <InputLog
//                                     value={this.state.username}
//                                     onChange={this.handleInputChange}
//                                     name="username"
//                                     placeholder="&#xf007; USERNAME"
//                                 />
//                                 <p>Password</p>
//                                 <InputLog
//                                     value={this.state.password}
//                                     onChange={this.handleInputChange}
//                                     name="password"
//                                     placeholder="&#xf023; PASSWORD"
//                                 />
//                                 <button className="btn btn-warning loginBtn"
//                                     onClick={this.login}
//                                 >
//                                 Log in
//                                 </button>

//                                 <GoogleButton>
//                                 </GoogleButton>

//                                 <button className="btn btn-warning registerBtn"
//                                     onClick={this.createAccount}
//                                 >
//                                 Register
//                                 </button>
//                             </form>
//                         </div>
//                         <div className="col-sm-3 hidden-xs"></div>
//                     </Row>
//                 </Container>
//             </div>
//         );
//     }
// }

// export default Login;

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
//import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'

class Login extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
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
		console.log('handleSubmit')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/profile'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="LoginForm">
					<h1>Login form</h1>
					<form>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
						/>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
						<button onClick={this.handleSubmit}>Login</button>
					</form>
				</div>
			)
		}
	}
}

export default Login