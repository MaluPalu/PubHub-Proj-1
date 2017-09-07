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
module.exports = {
  index1: index1,
  // create1: create1,
  // retrieve1: retrieve1,
  // destroy1: destroy1,
  // update1: update1
};
