var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
  pubHubId: Schema.Types.ObjectId,
  reviewerName: String,
  reviewerRating: String,
  reviewerNotes: String,
});

var Reviews = mongoose.model('Reviews', ReviewsSchema);

module.exports = Reviews;
