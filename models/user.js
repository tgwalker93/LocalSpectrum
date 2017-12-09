const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, 
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
    itemReviews: [{
        type: Schema.Types.ObjectId,
        ref: "itemReview"
    }],
    synopsis: String,
    date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
