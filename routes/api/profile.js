var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();


//scraping tools
var request = require("request");
var cheerio = require("cheerio");


//models 
// var Note = require("../../models/Note.js");
var User = require("../../db/models/user.js");
var Item = require("../../db/models/Item.js");


// app.post("/saveItem", function (req, res) {
//     console.log("/saveItem profile")
//     var resultObj = {
//         properties: {
//             itemName: req.body.item.itemObj.itemName,
//             itemSummary: req.body.item.itemObj.itemSummary,
//             itemImage: req.body.item.itemObj.itemImage
//         },
//         geometry: {}
//     };
//     var userProfile = req.body.item.itemObj.userProfile
//     console.log("-----resultObj-----")
//     console.log(resultObj)
//     console.log("-------------------")
//     console.log("-----userProfile-----")
//     console.log(userProfile)
//     console.log("-------------------")
// })


// Routes
//==========================
//getItemIds
// app.get("/getUserData/:id", function (req, res) {
//     console.log("I'm in profile api js /getUserData/:id")
//     console.log(req.params.id);
//     User.findById(req.params.id)
//         .populate("properties.items")
//         .then(function (doc, error) {
//             // Log any errors
//             if (error) {
//                 console.log("getUserData back-end failed!")
//                 console.log(error);
//             }
//             // Or send the doc to the browser as a json object
//             else {
//                 console.log("getUserData back-end was successful!");
//                 //// below console log log out the long query of imageUpload
//                 // console.log(doc);
//                 res.json(doc);
//             }
//         });

//     });

    // //Get Items
    // app.get("/getItems", function (req, res) {
    //     console.log("I'm IN THE BACKEND /getItems route api/profile")
    //     var result = req.body;
    //     console.log(result);
    //     for(i=0; i<result.length; i++) {
    //         result[i] = mongoose.Types.ObjectId(result[i]);
    //     }

    //     User.find({
    //         '_id': {
    //             $in: result

    //             [
    //                 mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
    //                 mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
    //                 mongoose.Types.ObjectId('4ed3f18132f50c491100000e')

    //             ]
    //         }
    //     },function (error, doc) {
    //         // Log any errors
    //         if (error) {
    //             console.log(error);
    //         }
    //         // Or send the doc to the browser as a json object
    //         else {
    //             console.log("GET ITEMS WAS SUCCESSFUL ON THE BACK END")
    //             console.log(doc);
    //             res.json(doc);
    //         }
    //     });


    // });
    //getItemIds
    app.get("/getItems/:id", function (req, res) {
    console.log("I'm in profile api js /getItems/:id")
    console.log(req.params.id);
    User.findById(req.params.id)
        .populate("properties.items")
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
    //SAVE ITEM EVERYTIME SOMEONE CLICKS ADD ITEM
    app.post("/saveItem", function (req, res) {
        console.log("I'm IN THE BACKEND /saveItem route api/profile")
        var resultObj = {
            properties: {
                itemName: req.body.item.itemObj.itemName,
                itemSummary: req.body.item.itemObj.itemSummary,
                itemImage: req.body.item.itemObj.itemImage,
                username: ""
            },
            geometry: {}
        };
        let errorResponse = "";
        var userProfile = req.body.item.itemObj.userProfile;
        resultObj.properties.username = userProfile.properties.username;
    
        console.log("BEFORE I REQUEST GOOGLE API");
        console.log(userProfile);

        var apiKey = "AIzaSyBejz2PGLk2-SG6MI6FCEmyaCQG-7pPuuw"
        var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + userProfile.properties.user_city + "+" + userProfile.properties.user_state + "&key=" + apiKey;
        // var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + req.params.location + "&destinations=&key=" + apiKey;
        console.log(query);
        request(query, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("I've requested the registered user's access, google api, below is googleLocation")
                let googledLocation = JSON.parse(body).results[0];
                console.log("test")
                console.log(googledLocation)

                // resultObj.location = body
                if(googledLocation){
                    let coordinateString = googledLocation.geometry.location.lng + "," + googledLocation.geometry.location.lat;
                    resultObj.geometry = {
                        coordinates: coordinateString.split(',').map(Number)
                    }
                    resultObj.user_formatted_address = googledLocation.formatted_address;
                }
               
               
                var newItem = new Item(resultObj);
                // And save the new note the db
                newItem.save(function (error, doc) {
                    // Log any errors
                    if (error) {
                        console.log(error);
                    }
                    // Otherwise
                    else {
                        console.log("newItem.save was successful in profile route /saveItem")
                        console.log("bleow is doc")
                        console.log(doc._id)
                        console.log(doc);
                        // Use the item id to find and update it's note
                        console.log("TESTING USER ID!!!!!!! ") 
                        console.log(userProfile);
                        User.findOneAndUpdate({ "_id": userProfile._id }, { $push: { "properties.items": doc._id } },
                            { safe: true, upsert: true })
                            // Execute the above query
                            .exec(function (err, doc) {
                                // Log any errors
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    // Or send the document to the browser
                                    console.log("User.Find One And Update in Save Item Route is successful. ")
                                    console.log(doc);
                                    res.json(doc);
                                }
                            });
                    }
                });
            } 
        })

    });

module.exports = app;