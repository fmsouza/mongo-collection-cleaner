var MongoClient = require("mongodb").MongoClient;
var CronJob = require('cron').CronJob;
var config = require("./config");
var moment = require('moment');

var mongoConfig = config.databaseConnection.mongodb;
var ageLimit = config.ageLimit;

var mongoUrl = mongoConfig.host + ":" + mongoConfig.port + "/" + mongoConfig.dbName;
mongoUrl = (mongoConfig.user !== "" && mongoConfig.pass !== "")?
	"mongodb://" + mongoConfig.user + ":" + mongoConfig.pass + "@" + mongoUrl : "mongodb://" + mongoUrl;

MongoClient.connect(mongoUrl, function(error, db){
	if(error){
		console.log("mongo", error);
		process.exit(1);
	} else {
        new CronJob(config.cronPattern, function() {
            var collection = db.collection(config.collectionName);
            var now = new Date();
            var timeLimit = new Date(now.valueOf());
            timeLimit.setHours(timeLimit.getHours() - ageLimit.days*24 - ageLimit.hours);
            timeLimit.setMinutes(timeLimit.getMinutes() - ageLimit.minutes);
            timeLimit.setSeconds(timeLimit.getSeconds() - ageLimit.seconds);
            
            var batch = collection.initializeUnorderedBulkOp();
            batch.find({ timestamp: { $lt: timeLimit.toISOString() } }).remove();
            batch.execute(function(error, response){
                if(error){
                    console.log("mongo remove", error);
                    process.exit(1);
                } else {
                    console.log("Removed:", response.nRemoved);
                    process.exit();
                }
            });
        });
	}
});