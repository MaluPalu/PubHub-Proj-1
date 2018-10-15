var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PubHubSchema = new Schema({
  nameHub: String,
  streetAddress: String,
  crossStreet: String,
  gpsCoords: {
    lat: Number,
    long: Number,
  },
  photo: String,
  notes: String,
  reviews: [ Schema.Types.ObjectId ]
});

var PubHub = mongoose.model('PubHub', PubHubSchema);

module.exports = PubHub;
