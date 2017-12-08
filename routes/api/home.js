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
                    console.log("I requested google maps api");
                    console.log(geo);
                    // $near: [geo.lat, geo.lng]
                    Item.find({
                        $text: { $search: resultObj.search },

                    })
                        // .skip(20)
                        .limit(10)

                        .exec(function (err, textResults) { 
                            if (err) {
                                console.log("query items in database by search text failed")
                                console.log(err)
                            } else {
                            resultObj.textResults = textResults
                            console.log("query items in database by search text was successful, below is text results**********************")
                            console.log(textResults);
                            Item.find({
                                'geometry.coordinates': {
                                    $geoWithin: {
                                        $center: [[geo.lng, geo.lat], 500]
                                    }

                                }
                            })
                                // .skip(20)
                                .limit(10)

                                .exec(function (err, results) {

                                    if (err) {
                                        console.log("searching users by location was not successful");
                                        console.log(err);
                                    } else {
                                        console.log("ive successfully searched users by location, below is geoResults");
                                        console.log(err)
                                        console.log(results);
                                        resultObj.geoResults = results
                                        resultObj.finalResults = [];

                                        for(i=0; i<resultObj.textResults.length; i++) {
                                            console.log("geo results -- -- - - - - ")
                                            console.log(resultObj.geoResults[i]._id)
                                            console.log("text results ---- - - - - - -- - - ")
                                            console.log(resultObj.textResults[i]._id);
                                            for(j=0; j<resultObj.geoResults.length; j++) {
                                                if (resultObj.geoResults[j]._id === resultObj.textResults[i]._id) {
                                                    let combineObj = {
                                                        geoResults: resultObj.geoResults[i],
                                                        textResults: resultObj.textResults[i].itemName
                                                    }
                                                    resultObj.finalResults.push(combineObj)
                                                    console.log("*******************************************************below is combineObj, a search item that matches distance*****************");
                                                    console.log(combineObj);
                                                }

                                            }

                                        }
                                        console.log("THE END BELOW IS FINAL RESULTS -----------------------------")
                                        console.log(resultObj.finalResults)
                                        res.json(resultObj.finalresults);

                                    }
                                });


                            }



                            
                        })


                } else {
                    resultObj.results = "Google Maps API was not successful!"
                }



            });



    } else{
        res.json(resultObj);

    }


    });



module.exports = app;