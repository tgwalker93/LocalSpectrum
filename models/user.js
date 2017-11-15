const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, 
        required: true 
    },
    password: { 
        type: String, 
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
    products: {
        type: [Schema.Types.ObjectId],
        ref: "Product"
    },
    userReview: {
        type: [Schema.Types.ObjectId],
        ref: "UserReview"
    },
    synopsis: String,
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
