/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let MONGO_URL
const MONGO_LOCAL_URL = 'mongodb://localhost/local-spectrum'


// Connect to the Mongo DB
// if (process.env.MONGODB_URI) {
// 	mongoose.connect("mongodb://heroku_gvzh6nxl:752ndkfm90ojbhmsi5gmfeh9n1@ds133746.mlab.com:33746/heroku_gvzh6nxl")
// 	MONGO_URL = process.env.MONGODB_URI
// } else {
// 	mongoose.connect(MONGO_LOCAL_URL) // local mongo url
// 	MONGO_URL = MONGO_LOCAL_URL
// }

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || MONGO_LOCAL_URL, {
	useMongoClient: true
});

// should mongoose.connection be put in the call back of mongoose.connect???
var db = mongoose.connection
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
	console.log(
		`You have successfully connected to your mongo database: ${MONGO_URL}`
	)
})

module.exports = db
