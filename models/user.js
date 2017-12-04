const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

const UserSchema = new Schema({
    username: { type: String, 
        unique: false,
        required: true 
    },
    password: { 
        type: String, 
        unique: false,
        required: true 
    },
    user_address: {
        type: String,
        required: false
    },
    user_zip: {
        type: String,
        required: false
    },
    user_email: {
        type: String,
        required: false
    },
    user_phone: {
        type: String,
        required: false
    },
    business_name: {
        type: String,
        required: false
    },
    business_address: {
        type: String,
        required: false
    },
    business_zip: {
        type: String,
        required: false
    },
    business_email: {
        type: String,
        required: false
    },
    business_phone: {
        type: String,
        required: false
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: "Item",
}],
    itemReview: {
        type: [Schema.Types.ObjectId],
        ref: "itemReview"
    },
    synopsis: String,
    date: { type: Date, default: Date.now }
});

// Define schema methods
UserSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
UserSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
