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



app.get("/search/search=:search&location=:location", function (req, res) {
    console.log("I'm in home search back-end")

    console.log(req.params.search);
    console.log(req.params.location);
    
    var resultObj = {
        search: req.params.search,
        location: {},
        results: []
    }



    Item.find({ $text: { $search: req.params.search } })
        // .skip(20)
        .limit(10)

        .exec(function (err, results) { 
            // console.log(results)
            resultObj.results = results
            var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
            var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.location + "&key=" + apiKey;
            var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + req.params.location + "&destinations=&key=" + apiKey;
            request(query, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                resultObj.location = JSON.parse(body).results;
                // resultObj.location = body
                res.json(resultObj) 

                } else
                {
                    resultObj.results = "Google Maps API was not successful!"
                }

            });
            
        });


    });



module.exports = app;