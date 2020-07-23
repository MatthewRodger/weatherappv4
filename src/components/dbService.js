
const User = require("./schema/userModel.js");
const db = "mongodb://localhost:27017/mydb";

class DBService {
    constructor(){
        const mongoose = require('mongoose');
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });  
    }



    getUser(){
        User.find({}, function(err, result){
            if(err){
                console.log("there was error")
            } else {
                return(result);
            }
        })
        
    }

}

export default DBService;


