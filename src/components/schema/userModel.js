var mongoose = require("mongoose");
var schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
    username: String,
    locationPref: String,
    dob: String
});
module.exports = mongoose.model("users", UserSchema);