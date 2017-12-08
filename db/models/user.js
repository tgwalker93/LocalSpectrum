const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

const UserSchema = new Schema({
    properties: {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        user_image: {
            type: String,
            required: false
        },
        user_formatted_address: {
            type: String,
            required: false
        },
        user_address: {
            type: String,
            required: false
        },
        user_city: {
            type: String,
            required: false
        },
        user_state: {
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
    },
    geometry: {
        coordinates: {
            type: [Number], index: '2dsphere'
        }
    }
});

// Define schema methods
UserSchema.methods = {
	checkPassword: function(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.properties.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
UserSchema.pre('save', function(next) {
	if (!this.properties.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.properties.password = this.hashPassword(this.properties.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

// UserSchema.index({ items: 'text' });
// UserSchema.index({ 'properties.items': 'text' });
UserSchema.index({ '$**': 'text' });

// Create reference to User & export
const User = mongoose.model("User", UserSchema);
module.exports = User
