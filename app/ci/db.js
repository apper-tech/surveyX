var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("survey");
    dbo.createCollection("surveys", function (err, res) {
        if (err) throw err;
        db.close();
    });
    dbo.createCollection("participants", function (err, res) {
        if (err) throw err;
        console.log("Init Done!");
        db.close();
    });
});