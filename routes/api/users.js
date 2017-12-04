var express = require("express");
var path = require('path');
var request = require("request");
var app = express.Router();
var passport = require("../../passport/");
app.use(passport.initialize()); 
//var LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
//models 
var User = mongoose.model('User')

app.get('/user', (req, res) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})

// app.use('/auth', function (req, res, next) {
// 	if (req.isAuthenticated()) {
// 	  console.log("checkusertrue")
// 		// returns true if a user already logged in.
// 	} else {
// 	  console.log("checkuserfalse")
// 	}
// 	next();
//   });

app.post(
	'/loginUser',
	function(req, res, next) {
		console.log(req.body)
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		console.log("---cleanUser--");
		console.log(cleanUser);
		console.log("--/cleanuser---")
		if (cleanUser) {
			//res.cookie("userid", cleanUser, {domain: "localhost", maxAge: 365 * 24 * 60 * 60 * 1000} );
			console.log(`Deleting ${cleanUser.password}`)
			delete cleanUser.password
		}
		res.json({ user: cleanUser })
	}
)

app.post('/saveUser', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'username': username,
			'password': password
		})
		newUser.save((err, savedUser) => {
            if (err) return res.json(err)
            console.log("sucesssssss")
            console.log(newUser);
			return res.json(savedUser)
		})
	})
})

//SAVE ARTICLE FOR WHEN USER CLICKS SAVE
// app.post("/saveUser", function (req, res) {
//     console.log("I'm in save user post")
//     var result = req.body;
//     console.log(result);
//     // Using our Article model, create a new entry
//     // This effectively passes the result object to the entry (and the title and link)
//     var entry = new User(result);

//     // Now, save that entry to the db
//     entry.save(function (err, doc) {
//         // Log any errors
//         if (err) {
//             console.log("OHH NO I HAVE AN ERORR")
//             console.log(err);
//         }
//         // Or log the doc
//         else {
//             console.log(doc);
//             res.json(doc);
//         }
//     });

// });

// app.post('/loginUser',
// passport.authenticate('local', { session: false }),
// function (req, res) {
//     console.log("user authenticated..account.routes.js ", req.user.username, req.user.password);
//     res.cookie("userid", req.user._id, {domain: "localhost", maxAge: 365 * 24 * 60 * 60 * 1000} );
//     res.json({ username: req.user.username, password: req.user.password, id: req.user._id });
//     console.log("userid: " + req.user._id);
// });

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//      console.log("passport called")
//       process.nextTick(function () {
//         User.findOne({'username':username},
//           function(err, user) {
//               if (err) { return done(err); }
//               if (!user) { return done(null, false); }
//               if (user.password != password) { return done(null, false); }
//               return done(null, user);
//           });
//       });
//     }
//   ));

//HEADLINES END ------------------------------------------------------


module.exports = app;