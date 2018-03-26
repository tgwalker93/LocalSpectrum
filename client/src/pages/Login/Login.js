import {Row, Container } from "../../components/Grid";
 import { InputLog} from "../../components/LoginItem";




// export default Login;

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'


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
				<Container fluid>
                    <Row>
                        <div className="col-sm-3 hidden-xs"></div>
                        <div className="col-sm-6">

                            <form className="login">
                                <p>Username</p>
                                <InputLog
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    name="username"
                                    placeholder="&#xf007; USERNAME"
                                />
                                <p>Password</p>
                                <InputLog
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                    placeholder="&#xf023; PASSWORD"
                                />
                                <button className="btn btn-warning loginBtn"
                                    onClick={this.handleSubmit}
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