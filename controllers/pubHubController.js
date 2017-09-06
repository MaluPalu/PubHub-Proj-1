let db = require('../models');

function index(req, res) {
  // send back all cliffs as JSON
  db.PubHub.find(function(err, pubHubs){
    if (err) {
      console.log("index error" + err);
      res.sendStatus(500);
    }
    res.send(pubHubs);
  });
}

// POST /api/pubHubs
function create(req, res) {
  //create pubHub using form data from req parameter
};

// GET /api/pubHubs/:pubHubId
function retrieve(req, res) {
};

// DELETE /api/pubHubs/:pubHubId
function destroy(req, res) {
};


function update(req, res) {
};


module.exports = {
  index: index,
  create: create,
  retrieve: retrieve,
  destroy: destroy,
  update: update
};
