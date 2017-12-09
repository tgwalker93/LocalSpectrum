var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemReviewSchema = new Schema({
reviews: {
    rating: {
        type: Number,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
}
});

var ItemReview = mongoose.model("ItemReview", ItemReviewSchema);
module.exports = ItemReview;