let db = require('../models');


function index(req, res) {
  // send back all cliffs as JSON
  db.PubHub.find({}, function(err, allPubHubs){
    res.json(allPubHubs);
  });
}

// POST /api/pubHubs
function create(req, res) {
  //create pubHub using form data from req parameter
  var newPub = new db.PubHub({
    nameHub: req.body.nameHub,
    streetAddress: req.body.streetAddress,
    crossStreet: req.body.crossStreet,
    gpsCoords: {
      lat: req.body.lat,
      long: req.body.long
    },
    photo: req.body.photo,
    notes: req.body.notes
  });
  newPub.save(function(err, pub){
    if (err) {
      console.log(err);
      return;
    }
    console.log("created", pub.name);
    res.json(pub);
  });
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
