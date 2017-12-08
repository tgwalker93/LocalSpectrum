var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;

//models 
var User = require("../../db/models/User.js");






// Routes
//==========================


//SAVE ARTICLE FOR WHEN USER CLICKS SAVE
app.post("/saveUser", function (req, res) {
    console.log("I'm in save user post")
    var resultObj = {
        properties: req.body,
        geometry: {}


    };
    console.log(resultObj);
    // Using our Article model, create a new entry
    // This effectively passes the result object to the entry (and the title and link)

    // var entry = new User(result);


    //get cordinates from Google Maps API
    // if(resultObj.properties.user_address) {

    var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
    var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + resultObj.properties.user_address + "+" + resultObj.properties.user_city + "+" + resultObj.properties.user_state + "&key=" + apiKey;
    // var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + req.params.location + "&destinations=&key=" + apiKey;
    console.log(query);
    request(query, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("I've requested the registered user's access, google api, below is googleLocation")
            let googledLocation = JSON.parse(body).results[0];
            console.log("test")
            console.log(googledLocation)
            // resultObj.location = body
            let coordinateString = googledLocation.geometry.location.lng + "," + googledLocation.geometry.location.lat;
            resultObj.geometry = {
                coordinates: coordinateString.split(',').map(Number)
            }
            resultObj.user_formatted_address = googledLocation.formatted_address;
            var entry = new User(resultObj);
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
                    resultObj.doc = doc;
                    res.json(resultObj)
                    // res.json(doc);
                }
            });


        } else {
            resultObj.results = "Google Maps API was not successful!"
        }

    });

    // Now, save that entry to the db
    // entry.save(function (err, doc) {
    //     // Log any errors
    //     if (err) {
    //         console.log("OHH NO I HAVE AN ERORR")
    //         console.log(err);
    //     }
    //     // Or log the doc
    //     else {
    //         console.log(doc);
    //         res.json(doc);
    //     }
    // });

});

app.post('/loginUser',
    passport.authenticate('local', { session: false }),
    function (req, res) {
        console.log("user authenticated..account.routes.js ", req.user.username, req.user.password);
        res.cookie("userid", req.user._id, { domain: "localhost", maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.json({ username: req.user.username, password: req.user.password, id: req.user._id });
        console.log("userid: " + req.user._id);
    });

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("passport called")
        process.nextTick(function () {
            User.findOne({ 'username': username },
                function (err, user) {
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