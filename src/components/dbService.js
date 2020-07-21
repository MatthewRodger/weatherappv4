var MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";
const dbName = "WeatherApp";
const dbCollection = "Users";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
});

//public, maybe do some error detecting here
function dbPost(inUserName, inLocation, inDob){
    var obj = {username: inUserName,
            locationpref: inLocation,
            dob: inDob}
    
        actualdbPost(obj);
}

//private
function actualdbPost(object){
    dbo.collection(dbCollection).insertOne(object)
}


function getUserByUsername(inUsername) {
    dbo.collection(dbCollection).find({username: "matt"}).toArray(function(err, result) {
        if (err) throw err;
        return(result);
      });
}

