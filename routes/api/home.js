var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();


//scraping tools
var request = require("request");
var cheerio = require("cheerio");


//models 
// var Note = require("../../models/Note.js");
var User = require("../../models/User.js");
var Item = require("../../models/Item.js");



app.get("/search/:search", function (req, res) {
    console.log("I'm in home search back-end")

    console.log(req.params.search);
    var testObj = {
        search: req.params.search
    }

    Item.find({ $text: { $search: "aa" } })
        // .skip(20)
        .limit(10)

        .exec(function (err, results) { 
            
            console.log(results)
            res.json(results) 
        });
        // .then(function (doc, error) {
        //     // Log any errors
        //     if (error) {
        //         console.log("search back-end failed!")
        //         console.log(error);
        //     }
        //     // Or send the doc to the browser as a json object
        //     else {
        //         console.log("search back-end was successful!");
        //         console.log(doc);
        //         res.json(doc);
        //     }
        // });




    });



module.exports = app;