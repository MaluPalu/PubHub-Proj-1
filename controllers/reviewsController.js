let db = require('../models');

function index1(req, res) {
  // send back all cliffs as JSON
  db.Reviews.find({}, function(err, reviews){
    if (err) {
      console.log("index error" + err);
      res.sendStatus(500);
    }
    res.json(reviews);
  });
}



function index(req, res) {
  // send back all cliffs as JSON
  db.Reviews.find({}, function(err, reviews){
    res.json(reviews)
  });
}

// POST /api/pubHubs/reviews
function create(req, res) {
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

// GET /api/pubHubs/:reviewerId
function retrieve(req, res) {
};

// // DELETE /api/pubHubs/:pubHubId
// function destroy(req, res) {
// };


// function update(req, res) {
// };


module.exports = {
  index1: index1,
  index: index,
  create: create,
  retrieve: retrieve,
  // destroy: destroy,
  // update: update
};
