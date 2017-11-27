const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const profileSchema = new Schema({
    BusinessTitle: {type: String, required: true},
    AddressLine1: {type: String, required: false},
    AddressLine2: {type: String, required: false},
    City: {type: String, required: true},
    ZipCode: {type: String, required: true},
    State: {type: String, required: true},
    Country: {type: String, required: true},
    FacebookLink: {type: String, required: false},
    TwitterHandle: {type: String, required: false},
    Instagram: {type: String, required: false},
    Email: {type: String, required: true},
    PhoneNo: {type: String, required: true},
    FaxNo: {type: String, required: false}
});

const Profile = mongoose.model("Profile", profileSchema); 
module.exports = Profile; 