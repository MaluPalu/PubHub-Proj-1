var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewsSchema = new Schema({
  pubHub: {
    type: Schema.Types.ObjectId,
    ref: 'PubHub'
  },
  reviewerName: String,
  reviewerRating: String,
  reviewerNotes: String,
});

var Reviews = mongoose.model('Reviews', ReviewsSchema);

module.exports = Reviews;
