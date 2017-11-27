var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();

//scraping tools
var request = require("request");
var cheerio = require("cheerio");

//models 
var User = require("../../models/User.js");

const router = require("express").Router();

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

//HEADLINES END ------------------------------------------------------

module.exports = app;