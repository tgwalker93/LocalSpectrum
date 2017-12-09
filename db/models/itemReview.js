var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemReviewSchema = new Schema({
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    usernameOfReviewer: {
        type: String,
        required: false
    }

});

var ItemReview = mongoose.model("ItemReview", ItemReviewSchema);
module.exports = ItemReview;