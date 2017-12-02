var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

//scraping tools
var request = require("request");
var cheerio = require("cheerio");


//models 
var User = require("../../models/User.js");






// Routes
//==========================


//SAVE ARTICLE FOR WHEN USER CLICKS SAVE
app.post("/saveUser", function (req, res) {
    console.log("I'm in save user post")
    var result = req.body;
    console.log(result);
    // Using our Article model, create a new entry
    // This effectively passes the result object to the entry (and the title and link)
    var entry = new User(result);

    // Now, save that entry to the db
    entry.save(function (err, doc) {
        // Log any errors
        if (err) {
            console.log("OHH NO I HAVE AN ERORR")
            console.log(err);
        }
        // Or log the doc
        else {
            console.log(doc);
            res.json(doc);
        }
    });

});

app.post('/loginUser',
passport.authenticate('local', { session: false }),
function (req, res) {
    console.log("user authenticated..account.routes.js ", req.user.username, req.user.password);
    res.cookie("userid", req.user._id, {domain: "localhost", maxAge: 365 * 24 * 60 * 60 * 1000} );
    res.json({ username: req.user.username, password: req.user.password, id: req.user._id });
    console.log("userid: " + req.user._id);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
     console.log("passport called")
      process.nextTick(function () {
        User.findOne({'username':username},
          function(err, user) {
              if (err) { return done(err); }
              if (!user) { return done(null, false); }
              if (user.password != password) { return done(null, false); }
              return done(null, user);
          });
      });
    }
  ));



//HEADLINES END ------------------------------------------------------





module.exports = app;