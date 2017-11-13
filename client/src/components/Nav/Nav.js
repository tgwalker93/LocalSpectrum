import React from "react";
import { Link } from "react-router-dom";
const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <ul className="nav navbar-nav">
        <li
          className={window.location.pathname === "/books" ? "active" : ""}
        >
          <Link to="/books">SearchList</Link>
        </li>

        </ul>
      </div>
    </div>
  </nav>;

export default Nav;
