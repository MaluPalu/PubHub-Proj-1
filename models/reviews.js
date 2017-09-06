var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
  nameReviewer: String,
  rating: String,
  review: String,
  PubHub: String
});

var Reviews = mongoose.model('Reviews', ReviewsSchema);

module.exports = Reviews;
