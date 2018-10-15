var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://MaluPalu:pubhub1234!@ec2-18-206-214-214.compute-1.amazonaws.com:27017/personal-api", {useMongoClient: true});
mongoose.Promise = global.Promise;  // use native Promise

module.exports.PubHub = require("./pubHubs.js");
module.exports.Reviews = require("./reviews.js");
