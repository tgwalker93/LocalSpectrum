import React from 'react';
// import logo from 'logo.svg';
// import './App.css';
import "./Header.css";


const Header = props => (
    <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="home.html">Negozio</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                        
                <ul className="nav navbar-nav navbar-right">
                    <li><a href=""><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                </ul>

                <form className="navbar-form navbar-right">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search" id="search" name="search"/>
                        <div className="input-group-btn">
                            <button className="btn btn-default" type="submit">
                              <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </form>


            </div>
        </div>
    </nav>
 );
  
export default Header;
