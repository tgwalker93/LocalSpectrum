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



app.get("/search/search=:search&location=:location?", function (req, res) {
    console.log("I'm in home search back-end")

    console.log(req.params.search);
    console.log(req.params.location);
    
    var resultObj = {
        search: req.params.search,
        location: {},
        results: []
    }

    if(req.params.location){


            var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
            var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.location + "&key=" + apiKey;
            var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + req.params.location + "&destinations=&key=" + apiKey;
            request(query, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                // console.log(results)

                 resultObj.location = JSON.parse(body).results;
                // resultObj.location = body
                    var geo = resultObj.location[0].geometry.location


                    // $near: [geo.lat, geo.lng]
                    
                    Item.find({ 
                        $text: { $search: req.params.search }, 
                        loc: {
                            $geoWithin: {
                                $geometry: {
                                    type: "Polygon",
                                    coordinates: [[[geo.lat, geo.lng], [3, 6], [6, 1], [0, 0]] ]
                                
                                }
                                }
                                
                            }
                    
                    })
                        // .skip(20)
                .limit(10)

                .exec(function (err, results) {

                    if(err){
                        console.log("searching users by location was not successful");
                        console.log(err);
                    }else{
                    console.log("ive successfully searched users by location, below is results");
                    console.log(err)
                    console.log(results);
                        resultObj.results = results
                    }
                    });

                } else
                {
                    resultObj.results = "Google Maps API was not successful!"
                }

            
        });



    } else{
        res.json(resultObj);

    }


    });



module.exports = app;