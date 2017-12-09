var path = require('path');
const express = require('express')
const app = express.Router()
const User = require('../../db/models/User')
const Item = require('../../db/models/Item')
const passport = require('../../passport')
var request = require("request");

// this route is just used to get the user basic info
app.get('/user', (req, res) => {
	console.log('=====get user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

app.post(
	'/login',
	function(req, res, next) {
		console.log("/auth/login called")
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.properties) {
			console.log(`Deleting ${cleanUser.properties.password}`)
			delete cleanUser.properties.password
		}
		console.log(cleanUser);
		res.json({ user: cleanUser })
	}
)

app.post('/logout', (req, res) => {
    console.log("in app.post/logout8************************************************WEFFWEFWEFWEFWEF");
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

app.post('/signup', (req, res) => {
	console.log("------auth signup------")
	console.log(req.body)
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'properties.username': username }, (err, userMatch) => {
		if (userMatch) {
			console.log("Sorry, already a user with the username: " + username)
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
        }
        
        console.log("WEVE SUCCESSFULLY MADE IT PAST User.findOne")
		// const newUser = new User({
		// 	'properties.username': username,
		// 	'properties.password': password
		// })
		// newUser.save((err, savedUser) => {
        //     if (err) return res.json(err)
            
        //     console.log("THERE WAS NO ERROR IN SAVING NEW USER");
		// 	return res.json(savedUser)
		// })

		console.log("I'm in save user post")
		var resultObj = {
			properties: req.body,
			geometry: {}
			
		 
		};
		console.log(resultObj);

	
	
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

	});
});


app.post("/saveItem", function (req, res) {
    console.log("I'm IN THE BACKEND /saveItem route api/profile")
	var result = req.body;
	console.log(result)
	console.log("----------------")
    // console.log(result);
    // Using our Article model, create a new entry
    // This effectively passes the result object to the entry (and the title and link)
    // Create a new note and pass the req.body to the entry
	var newItem = new Item(req.body.item.itemObj);
	console.log("new item: " + newItem)

    // And save the new note the db
    newItem.save(function (error, doc) {
		console.log("I'm IN THE BACKEND /saveItem route api/profile")
        var resultObj = {
            properties: {
                itemName: req.body.item.itemObj.itemName,
                itemSummary: req.body.item.itemObj.itemSummary,
                itemImage: req.body.item.itemObj.itemImage
            },
        geometry: {}
    };
        var userProfile = req.body.item.itemObj.userProfile
        // console.log(result);
        // Using our Article model, create a new entry
        // This effectively passes the result object to the entry (and the title and link)
        // Create a new note and pass the req.body to the entry

        // resultObj.results = results
        // var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
        // var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + req.params.location + "&key=" + apiKey;
        // var query2 = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + result.location + "&destinations=&key=" + apiKey;
        // request(query, function (error, response, body) {
        //     if (!error && response.statusCode === 200) {

        //         resultObj.location = JSON.parse(body).results;
        //         // resultObj.location = body
        //         res.json(resultObj)

        //     } else {
        //         resultObj.results = "Google Maps API was not successful!"
        //     }

        // });
    console.log("BEFORE I REQUEST GOOGLE API");
    console.log(userProfile);
    var apiKey = "AIzaSyBIG5ox_iGJBmdS5y1vyuaGEZUb9eBWe6U"
    var query = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + userProfile.user_address + "+" + userProfile.user_city + "+" + userProfile.user_state + "&key=" + apiKey;
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
                User.findOneAndUpdate({ "_id": req.body.item.userId }, { $push: { "properties.items": doc._id} },
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
});


module.exports = app