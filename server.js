const express = require("express");
const session = require('express-session')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
var passport = require('passport');
//var bcrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./models')

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/SearchList",
  {
    useMongoClient: true
  }
);
var oneHour = 3600;

var sessionStore = new MongoStore({
  url: 'mongodb://localhost:27017/SearchList',
  touchAfter: oneHour
});

app.use(
	session({
    store: new MongoStore({url: 'mongodb://localhost:27017/SearchList'}),
    secret: 'cats',
    resave: false,
		saveUninitialized: false
	})
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/routes/api/users', require('./routes/api/users'))

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

