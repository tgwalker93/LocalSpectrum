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
        <p id="logo" className={window.location.pathname === "/" ? "active" : ""}><Link className="logo" to="/"><img className="logoImg img-responsive" src="assets/img/logo.png" alt=""/></Link></p>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
        <li className={window.location.pathname === "/about" ? "active" : ""}><Link className="log" to="/about"><span className="glyphicon glyphicon-globe"></span> About</Link></li>
        <li className={window.location.pathname === "/" ? "active" : ""}><Link className="log" to="/"><span className="glyphicon glyphicon-search iconOnly"></span> Search</Link></li>
        <li className={window.location.pathname === "/contact" ? "active" : ""}><Link className="log" to="/contact"><span className="glyphicon glyphicon-earphone"></span> Contact</Link></li>
        <li className={window.location.pathname === "/login" ? "active" : ""}><Link className="log" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
        <li className={window.location.pathname === "/register" ? "active" : ""}><Link className="log" to="/register"><span className="glyphicon glyphicon-cog"></span> Register</Link></li>
        </ul>
      </div>
    </div>
  </nav>

export default Nav;
