var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemLocationSchema = new Schema({
    locationName: {
        type: String,
        required: true
    },
    locationCity: {
        type: String,
        required: false
    },
    locationZip: {
        type: String,
        required: false
    },
    lon: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }
});

var ItemLocation = mongoose.model("ItemLocationSchema", ItemLocationSchema);
module.exports = ItemLocation;