import React from 'react';
import { Link } from "react-router-dom";
// import logo from 'logo.svg';
// import './App.css';
import "./Navbar.css";


const Navbar = props => (
    <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <li className={window.location.pathname === "/" ? "active" : ""}><Link className="test" to="/">App Name</Link></li>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                {/* <ul class="nav navbar-nav">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#play">How</a></li>
                    <li><a href="#resource">Resources</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul> */}

                <ul className="nav navbar-nav navbar-right">
                    <li className={window.location.pathname === "/login" ? "active" : ""}><Link to="/login">Login</Link></li>
                    <li className={window.location.pathname === "/create" ? "active" : ""}><Link to="/create">Register</Link></li>
                </ul>


            </div>
        </div>
    </nav>
);

export default Navbar;
