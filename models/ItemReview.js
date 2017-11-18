var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemReviewSchema = new Schema({
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    stars: {
        type: Number,
        required: true
    },
    point: {
        type: Number,
        required: true
    }
});

var ItemReview = mongoose.model("ItemReview", ItemReviewSchema);
module.exports = ItemReview;