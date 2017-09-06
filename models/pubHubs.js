var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PubHubSchema = new Schema({
  nameHub: String,
  streetAddress: String,
  gpsCoords: {
    lat: Number,
    long: Number
  },
  crossStreet: String,
  photo: String,
  notes: String
});

var PubHub = mongoose.model('PubHub', PubHubSchema);

module.exports = PubHub;
