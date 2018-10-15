let db = require('../models');
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

function index(req, res) {
  // send back all PUBS as JSON
  db.Reviews.find({pubHubId: req.params.pubHubId}, function(err, reviews){
    res.json(reviews)
  });
}

// POST /api/pubHubs/reviews
function create(req, res) {
  //create pubHub using form data from req parameter
  var newReview = new db.Reviews({
    pubHubId: req.params.pubHubId,
    reviewerName: req.body.reviewerName,
    reviewerRating: req.body.reviewerRating,
    reviewerNotes: req.body.reviewerNotes,
  });
  newReview.save(function(err, review){
    if (err) {
      console.log('error saving new review', err);
      return;
    }
    res.json(review);
  })

};

// DELETE
function destroy(req, res) {
  db.Reviews.findByIdAndRemove(req.params.id, (err, review) => {
    console.log(req.params.id);
    if (err) {
      console.log(err);
    }
    res.status(200).send();
  });
};

function update(req, res) {
  console.log(req.body);
  db.Reviews.findById(req.params.id, function (err, foundReview) {
    if (err) {
      console.log(err);
      return;
    }
    foundReview.set({
      reviewerName: req.body.reviewerName || foundReview.reviewerName,
      reviewerRating: req.body.reviewerRating || foundReview.reviewerRating,
      reviewerNotes: req.body.reviewerNotes || foundReview.reviewerNotes
    });
    foundReview.save(function (err, updateReview) {
      if (err) {
        console.log(err);
      }
      console.log('Updated Review', updateReview);
      res.send(updateReview);
  })
  });
};

module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  update: update
};
