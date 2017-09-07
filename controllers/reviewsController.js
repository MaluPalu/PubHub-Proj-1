let db = require('../models');

function index1(req, res) {
  // send back all cliffs as JSON
  db.Reviews.find(function(err, reviews){
    if (err) {
      console.log("index error" + err);
      res.sendStatus(500);
    }
    res.send(reviews);
  });
}


// POST /api/pubHubs/reviews
function create1(req, res) {
  //create pubHub using form data from req parameter
  var newReview = new db.PubHub({
    pubHub: req.body.pubHub,
    reviewerName: req.body.reviewerName,
    reviewerRating: req.body.reviewerRating,
    reviewerNotes: req.body.reviewerNotes,
  });
  newReviewer.save(function(err, review){
    if (err) {
      console.log(err);
      return;
    }
    console.log("created", review.name);
    res.json(review);
  });
};


module.exports = {
  index1: index1,
  create1: create1,
  // retrieve1: retrieve1,
  // destroy1: destroy1,
  // update1: update1
};
