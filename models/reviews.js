var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
  pubHubName: String,
  reviewerName: String,
  reviewerRating: String,
  reviewerNotes: String,
});

var Reviews = mongoose.model('Reviews', ReviewsSchema);

module.exports = Reviews;
