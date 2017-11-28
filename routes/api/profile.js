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

const router = require("express").Router();

// Route function to get the profile information for the logged in user
app.get("/getProfile/:id", function (req, res) {
    console.log("server log: getProfile function called");
    console.log(req.params.id);
    User.findById(req.params.id)
        .then(function (doc, err) {
            if(err) {
                console.log("getProfile failed with error: " + err)
            } else {
                res.json(doc);
            }
        });
    // res.json(result);
});

app.post("/saveProfile", function(req, res) {
    console.log("server log: saveProfile function called");
    var result = req.body;
    console.log(req.body.businessName);
    
    User.findOneAndUpdate({ "_id": req.body.id }, { $set: { "business_name": req.body.businessName, 
                                                            "business_address":req.body.businessAddress, 
                                                            "business_zip":req.body.zipcode, 
                                                            "business_phone":req.body.phoneNo,
                                                            "business_faxno":req.body.faxNo,
                                                            "business_email":req.body.email,
                                                            "business_facebook":req.body.facebook,
                                                            "business_instagram":req.body.instagram} },
                        { multi: true, upsert: false })
    .exec(function (err, doc) {
        // Log any errors
        if (err) {
            console.log(err);
        }
        else {
            // Or send the document to the browser
            console.log(doc);
            res.json(doc);
        }
    });
});

app.post("/saveProduct", function(req, res) {
    console.log("Server Log: Save Product function called!");
});


// Routes
//==========================
//getItemIds
app.get("/getUserData/:id", function (req, res) {
    console.log("I'm in profile api js /getUserData/:id")
    console.log(req.params.id);
    User.findById(req.params.id)
    .populate("items")
    .then( function (doc, error) {
        // Log any errors
        if (error) {
            console.log("getUserData back-end failed!")
            console.log(error);
        }
        // Or send the doc to the browser as a json object
        else {
            console.log("getUserData back-end was successful!");
            console.log(doc);
            res.json(doc);
        }
    });

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

//SAVE ITEM EVERYTIME SOMEONE CLICKS ADD ITEM
app.post("/saveItem", function (req, res) {
        console.log("I'm IN THE BACKEND /saveItem route api/profile")
        var result = req.body;
        console.log(result);
        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        // Create a new note and pass the req.body to the entry
        var newItem = new Item(req.body.item.itemObj);

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
                // Use the article id to find and update it's note
                User.findOneAndUpdate({ "_id": req.body.item.userId }, { $push: { "items": doc._id} },
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

    });
});

module.exports = app;
