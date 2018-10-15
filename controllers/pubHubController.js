let db = require('../models');


function index(req, res) {
  // send back all PUBS as JSON
  db.PubHub.find(function(err, pubHubs){
    if (err) {
      console.log("index error" + err);
      res.sendStatus(500);
    }
    res.send(pubHubs);
  });
}
function show(req,res){
  db.PubHub.findById(req.params.id, function (err, foundPubHub) {
    if (err) {
      console.log("show error" + err);
      res.sendStatus(500);
    }
    res.send(foundPubHub);
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
    res.json(pub);
  });
};

// GET /api/pubHubs/:pubHubId
function retrieve(req, res) {
};

// DELETE /api/pubHubs/:pubHubId
function destroy(req, res) {
  db.PubHub.findByIdAndRemove(req.params.id, (err, PubHub) => {
    if (err) {
      console.log(err);
    }
    res.json(PubHub);
  });
};

// UPDATE /api/pubHubs/:pubHubId
function update(req, res) {
  db.PubHub.findById(req.params.id, function (err, foundPub) {
    if (err) {
      console.log(err);
      return;
    }
    foundPub.set({
      nameHub: req.body.nameHub || foundPub.nameHub,
      streetAddress: req.body.streetAddress || foundPub.streetAddress,
      gpsCoords: {
        lat: req.body.lat,
        long: req.body.long
      },
      crossStreet: req.body.crossStreet || foundPub.crossStreet,
      photo: req.body.photo || foundPub.photo,
      notes: req.body.notes || foundPub.notes
    });
    foundPub.save(function (err, updatePub) {
      if (err) {
        console.log(err);
      }
      res.send(updatePub);
  })
});
};

module.exports = {
  index: index,
  create: create,
  retrieve: retrieve,
  destroy: destroy,
  update: update,
  show: show,
};
