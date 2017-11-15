import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () =>
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <p id="logo" className={window.location.pathname === "/" ? "active" : ""}><Link className="logo" to="/">AppName</Link></p>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
        <li className={window.location.pathname === "/login" ? "active" : ""}><Link className="log" to="/login"><span className="glyphicon glyphicon-user"></span> Login</Link></li>
        <li className={window.location.pathname === "/create" ? "active" : ""}><Link className="log" to="/create"><span className="glyphicon glyphicon-log-in"></span> Register</Link></li>
        </ul>
      </div>
    </div>
  </nav>

export default Nav;
