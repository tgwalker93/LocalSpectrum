import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
{/* <nav class="navbar navbar-default">
<div class="container-fluid">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar2">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="http://disputebills.com"><img src="https://res.cloudinary.com/candidbusiness/image/upload/v1455406304/dispute-bills-chicago.png" alt="Dispute Bills">
    </a>
  </div>
  <div id="navbar2" class="navbar-collapse collapse">
    <ul class="nav navbar-nav navbar-right">
      <li class="active"><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
        <ul class="dropdown-menu" role="menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li class="divider"></li>
          <li class="dropdown-header">Nav header</li>
          <li><a href="#">Separated link</a></li>
          <li><a href="#">One more separated link</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <!--/.nav-collapse -->
</div>
<!--/.container-fluid -->
</nav> */}

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
        <p id="logo" className={window.location.pathname === "/" ? "active" : ""}><Link className="logo" to="/"><img className="logoImg img-responsive" src="https://dev.oasistears.com/images/default-source/Oasis-Tears/localspectrum.png?Status=Temp&sfvrsn=2" alt=""/></Link></p>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
        <li className={window.location.pathname === "/about" ? "active" : ""}><Link className="log" to="/about"><span className="glyphicon glyphicon-globe"></span> About</Link></li>
        <li className={window.location.pathname === "/contact" ? "active" : ""}><Link className="log" to="/contact"><span className="glyphicon glyphicon-earphone"></span> Contact</Link></li>
        <li className={window.location.pathname === "/login" ? "active" : ""}><Link className="log" to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
        <li className={window.location.pathname === "/register" ? "active" : ""}><Link className="log" to="/register"><span className="glyphicon glyphicon-cog"></span> Register</Link></li>
        </ul>
      </div>
    </div>
  </nav>

export default Nav;
