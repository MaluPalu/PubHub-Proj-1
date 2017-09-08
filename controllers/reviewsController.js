let db = require('../models');

function index(req, res) {
  // send back all cliffs as JSON
  console.log(req.params.pubHubId);
  db.Reviews.find({pubHub: req.params.pubHubId}, function(err, reviews){
    console.log(reviews);
    res.json(reviews)
  });
}

// POST /api/reviews
function create(req, res) {
  console.log(req.body);
  console.log(req.params.pubHubId);
  var newReview = new db.Reviews({
    pubHubName: req.body.pubHubName,
    reviewerName: req.body.reviewerName,
    reviewerRating: req.body.reviewerRating,
    reviewerNotes: req.body.reviewerNotes,
  });
  db.PubHub.findOne({_id: req.params.pubHubId}, function(err, pubhub){
    if (err) {
      console.log(err);
      return;
    }
    newReview.pubHub = pubhub;
    newReview.save(function(err, review){
      if (err) {
        console.log(err);
        return;
      }
      console.log("created", review.reviewerName);
      res.json(review);
    });
  })

};

function retrieve(req, res) {

};

function destroy(req, res) {

};

function update(req, res) {
  db.Reviews.findById(req.params.id, function (err, foundReview) {
    if (err) {
      console.log(err);
      return;
    }
    foundReview.set({
      reviewerName: req.body.reviewerName,
      reviewerRating: req.body.reviewerRating,
      reviewerNotes: req.body.reviewerNotes
    });
    foundPub.save(function (err, updateReview) {
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
  retrieve: retrieve,
  destroy: destroy,
  update: update
};
