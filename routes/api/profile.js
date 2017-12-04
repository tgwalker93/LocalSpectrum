var path = require('path');
var request = require("request");
var express = require("express");
var app = express.Router();

//models 
// var Note = require("../../models/Note.js");
var User = require("../../db/models/user");
var Item = require("../../db/models/item");

app.post("/saveItem", function (req, res) {
    console.log("I'm IN THE BACKEND /saveItem route api/profile")
    var result = req.body;
    // console.log(result);
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

module.exports = app;
