import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
// import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

const App = () =>
  <Router>
    <div>
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/profile" component={Profile} />
        {/* <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile/:id" component={Profile} />
        <Route component={Home} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;
