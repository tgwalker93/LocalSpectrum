import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'
import Footer from './components/Footer'
// import ProfileImg from './components/ProfileImg'
// import ProfileInfo from './components/ProfileInfo'
// import Header from './components/Header'
// import Body from './components/Body'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/create" component={CreateAccount} />
        {/* <Login /> */}
        {/* <ProfileImg />
        <Body /> */}
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
