var mongoose = require("mongoose");
var schema = mongoose.Schema;

var UserSchema = schema({
    username: {
        type: String,
        required: true
    },
    locationPref: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("User", UserSchema);