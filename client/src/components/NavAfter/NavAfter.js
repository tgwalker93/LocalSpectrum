import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Redirect from "react-router"
import "./NavAfter.css";
import { withRouter } from 'react-router-dom'
import API from '../../utils/API'

class NavAfter extends Component {
  // Setting our component's initial state
  state = {
    user: {

    },
    loggedIn: false,
    props: {

    }
  }

  componentDidMount() {
    console.log("component mounted")
    console.log(this.props.user.user)
    this.getUserProfile();
  }

  componentWillReceiveProps(nextProps) {

    console.log("I JUST ENTERED COMPONENT WILL RECEIVE PROPS BELOW IS LOGGED IN");
    console.log(this.state.loggedIn)
    if(this.state.loggedIn){
    this.setState({user: nextProps.user.user, loggedIn: nextProps.loggedIn, props: nextProps})
    }
  
  }


  getUserProfile() {
    console.log("Im in get user profile111");
    console.log(this.state.user)
  }

  _logout(event) {
  event.preventDefault()
  console.log('logging out')
  API.logout().then(response => {
    console.log("I'M IN LOGOUT");
    console.log(response.data)
    if (response.status === 200) {
      this.setState({
        loggedIn: false,
        user: null
      }, () => {
        //SEND THE USER PACKING HOME BYE
        this.props.history.push('/');
        window.location.reload(); 
      })

      
      console.log("-----------this.props---------")
      console.log(this.props)
      console.log("------------------------------")
      // {<Redirect to="/"/>}
    
      // this.state.props.history.push("/")
      // hashHistory.push("/")
      }
    
  })


  }


  render() {
  let boundNav = this._logout.bind(this);
  return (
  <nav className="navbar navbar-inverse">
  <div>
  </div>
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <p id="logo" className={window.location.pathname === "/" ? "active" : ""}><Link className="logo" to="/"><img className="logoImg img-responsive" src="/assets/img/logo.png" alt=""/></Link></p>
        </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
        <li className={window.location.pathname === "/about" ? "active" : ""}><Link className="log" to="/about"><span className="glyphicon glyphicon-globe"></span> About</Link></li>
            <li className={window.location.pathname === "/" ? "active" : ""}><Link className="log" to="/"><span className="glyphicon glyphicon-search iconOnly"></span> Search</Link></li>
        <li className={window.location.pathname === "/contact" ? "active" : ""}><Link className="log" to="/profile"><span className="glyphicon glyphicon-earphone"></span> Profile</Link></li>
        <li className={window.location.pathname === "/login" ? "active" : ""}><Link className="log" to="/login"><span className="glyphicon glyphicon-user">Welcome {this.props.user.user.properties.username}</span> 
        

         
         
         </Link></li>
        <li className={window.location.pathname === "/" ? "active" : ""}><Link to="/"  onClick={boundNav} className="log" ><span className="glyphicon glyphicon-log-out"></span> Logout</Link></li>
        
        </ul>
      </div>
    </div>
  </nav>
  )
  };

}

export default withRouter( NavAfter );
