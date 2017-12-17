var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();


//scraping tools
var request = require("request");
var cheerio = require("cheerio");


//models 
// var Note = require("../../models/Note.js");
var User = require("../../db/models/User.js");
var Item = require("../../db/models/Item.js");
var ItemReview = require("../../db/models/ItemReview.js");




app.get("/getItemReviews/:itemId", function (req, res) {
    console.log("I'm in profile api js /getItemReviews/:id")
    console.log(req.params.itemId);
    Item.findById(req.params.itemId)
        .populate("properties.itemReviews")
        .then(function (doc, error) {
            // Log any errors
            if (error) {
                console.log("getUserData back-end failed!")
                console.log(error);
            }
            // Or send the doc to the browser as a json object
            else {
                console.log("getUserData back-end was successful!");
                //// below console log log out the long query of imageUpload
                console.log(doc);
                res.json(doc);
            }
        });

});
app.post("/postReview", function(req, res) {
    console.log("I'm in the post review backend!!!!! below is req.body!!!!!!");
    console.log(req.body)

    let reviewObj = req.body;
    let usernameOfReviewer = null;
    if(reviewObj.user) {
        usernameOfReviewer = reviewObj.user.properties.username
    } 

    let review = {
        rating: reviewObj.rating,
        comment: reviewObj.comment,
        usernameOfReviewer: usernameOfReviewer
    }
    console.log(review);
    var newReview = new ItemReview(review);
    // And save the new note the db
    newReview.save(function (error, doc) {
        // Log any errors
        if (error) {
            console.log(error);
        }
        // Otherwise
        else {
            console.log("newReview.save was successful in profile route /postReview")
            console.log("below is doc")
            console.log(doc._id)
            console.log(doc);
            // Use the item id to find and update it's note
            console.log("TESTING ITEM ID!!!!!!! ")
            console.log(reviewObj.currentItem);
            Item.findOneAndUpdate({ "_id": reviewObj.currentItem._id }, { $push: {"properties.itemReviews": doc._id} },
                { safe: true, upsert: true })
                // Execute the above query
                .exec(function (err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // Or send the document to the browser
                        console.log("Item.Find One And Update in POST REVIEW Route is successful. ")
                        console.log(doc);
                        res.json(doc);
                    }
                });

            }
        });

});


     




app.get("/search/search=:search&location=:location?", function (req, res) {
    console.log("I'm in home search back-end")

    console.log(req.params.search);
    console.log(req.params.location);

    var resultObj = {
        search: req.params.search,
        location: {},
        results: []
    }

    if (req.params.location) {


        var apiKey = "AIzaSyBejz2PGLk2-SG6MI6FCEmyaCQG-7pPuuw"
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
                    // $text: { $search: req.params.search }, 
                    'geometry.coordinates': {
                        $geoWithin: {
                            $center: [[geo.lng, geo.lat], 5 / 3, 963.2 ]
                        }

                    }



                })
                    .populate('properties.itemReviews')
                    // .skip(20)
                    .limit(5000)

                    .exec(function (err, results) {

                        if (err) {
                            console.log("searching users by location was not successful");
                            console.log(err);
                            res.json({ failedLocation: "This location does not exist" })
                        } else {
                            console.log("ive successfully searched users by location, below is results");
                            console.log(err)
                            console.log(results);
                            resultObj.geoResults = results
                            resultObj.finalResults = [];
                            res.json(resultObj)
                        }
                    });

                } else {
                    res.json({ error: "There was an error with your address" });
                }


        });

        

    } else {
        res.json(resultObj);

    }


});



module.exports = app;