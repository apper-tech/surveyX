var Mongo = require('mongodb');
var MongoClient = Mongo.MongoClient;
var ObjectId = Mongo.ObjectId;
var ExpressClient = require('express')();
require('dotenv').config();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var url = process.env.MONGO_URL;
var dbName = process.env.DB_NAME;
var colSurveyName = process.env.COL_S_NAME;
var colParticipantName = process.env.COL_P_NAME;
//test key will be stored later in db
var serverKey = process.env.SERVER_WALLET;
// console.log that your server is up and running
ExpressClient.listen(port, () =>
    console.log(`
    Listening on port ${port}\n 
    DB: ${dbName}\n 
    Collections: ${colSurveyName} , ${colParticipantName}`
    )
);
ExpressClient.use(bodyParser.json()); // support json encoded bodies
ExpressClient.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// create a GET route
//Survey
ExpressClient.get('/getSurvey', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var query = {};
        if (req.query.Id)
            query = { "_id": ObjectId(req.query.Id) };
        if (req.query.surveyCode)
            query = { "surveyCode": req.query.surveyCode };
        dbo.collection(colSurveyName).findOne(query).then((data) => {
            db.close();
            //add participant
            res.send(data);
        })
    });
});
ExpressClient.get('/', function (req, res) {
    res.send('Survey API');
});
ExpressClient.post('/addSurvey', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colSurveyName).insertOne(req.body, function (err, data) {
            db.close();
            res.send(data);
        });
    });
});
//Participant
ExpressClient.get('/getParticipant', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var query = { "surveyId": req.query.surveyId };
        dbo.collection(colParticipantName).find(query).toArray(function (ierror, part) {
            db.close();
            res.send(part);
        })
    });
});
ExpressClient.post('/addParticipant', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(colParticipantName).insertOne(req.body, function (err, data) {
            db.close();
            res.send(data);
        });
    });
});
ExpressClient.get('/getKey', (req, res) => {
    res.send(serverKey);
});