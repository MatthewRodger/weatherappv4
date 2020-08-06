var mongoose = require("mongoose");
var schema = mongoose.Schema;

var UserSchema = schema({
    username: {
        type: String,
        required: [true, "username is required"],
        minlength: [2, "username too short"],
        maxlength: [32, "Username too long"]
    },
    locationPref: {
        type: String,
        required: [true, "location preference required"],
        minlength: [2, "location too short"],
        maxlength: [64, "lacation too long"]
    }
});
module.exports = mongoose.model("User", UserSchema);