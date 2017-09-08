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

function destroy(req, res) {
  // db.Reviews.findByIdAndRemove(req.params.id, (err, review) => {
  //   console.log(req.params.id);
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.status(200).send();
  // });
  db.Reviews.findOne({_id: req.params.pubHubId}, function(err, review){
    if (err) {
      console.log(err);
    }
    review.deleteOne({
      reviewerName: req.body.reviewerName,
      reviewerRating: req.body.reviewerRating,
      reviewerNotes: req.body.reviewerNotes
    })
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
