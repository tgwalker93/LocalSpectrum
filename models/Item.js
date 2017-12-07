var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
properties: {
    itemName: {
        type: String,
        required: true
    },
    itemSummary: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    itemImage: {
        type: String,
        required: false
    },
    // ItemLocation: {
    //     type: String,
    //     required: false
    // },
    // ItemLocation: {
    //     type: [Schema.Types.ObjectId],
    //     ref: "ItemLocation"
    // },
    itemReviews: [{
        type: [Schema.Types.ObjectId],
        ref: "ItemReview"
    }],
    itemCategory: [{
        type: [Schema.Types.ObjectId],
        ref: "ItemCategory"
    }],
    itemTag: [{
        type: [Schema.Types.ObjectId],
        ref: "ItemTag"
    }]
}, geometry: {
        coordinates: {
            // type: [Number], index: '2dsphere'
            type: [Number], index: '2dsphere'
        }
    }
});

ItemSchema.index({ 'properties.itemName': 'text', 'properties.itemSummary': 'text' });
// ItemSchema.index({ '$**': 'text' });

var Item = mongoose.model("Item", ItemSchema);

module.exports = Item;