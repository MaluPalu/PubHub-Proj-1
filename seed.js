var db = require('./models');

//Step 1, 1 of 2: This sets up your API
var pubHubList = [];
pubHubList.push({
  nameHub: "One Montgomery Terrace",
  streetAddress: "137 Sutter Street",
  crossStreet: "Montgomery and Sutter Street",
  gpsCoords:{
    lat: 37.789494,
    long: -122.402588,
  },
  photo: "http://gatetoadventures.com/wp-content/uploads/2015/08/One-Montgomery-Terrace-4-800x532.jpg",
  backgroundPhoto: "https://avatars.mds.yandex.net/get-pdb/33827/d2fc7d5d-cb50-4535-891a-756ae628e9d2/s1200",
  notes: "The big advantage of this terrace is that you can pick up food from any of the stores inside the Crocker Galleria and bring it up to the terrace to enjoy it.",
}, {
  nameHub: "St Mary’s Square",
  streetAddress: "651 California Street",
  crossStreet: "Pine Street and Quincy Street",
  gpsCoords:{
    lat: 37.791943,
    long: -122.405360,
  },
  photo: "http://gatetoadventures.com/wp-content/uploads/2015/08/St-Marys-Square-800x528.jpg",
  backgroundPhoto: "https://media-cdn.tripadvisor.com/media/photo-s/05/d7/68/62/cathay-house.jpg",
  notes: "This is a small park on top of a parking garage, which gives you an overview of the Financial District.",
});

//Step 1, 2 of 2
//Next step, go to server.js file to set up requests
db.PubHub.remove({}, function(err, pubHubs){
  db.PubHub.create(pubHubList, function(err, pubHubs){
    if (err) { return console.log('ERROR', err); }
    console.log("all pubHubs:", pubHubs);
    console.log("created", pubHubs.length, "pubHubs");
    process.exit();
  });
});

//Step 2, 1 of 2: This sets up your Reviewer API
var reviewList = [];
reviewList.push({
  pubHubName: "One Montgomery Terrace",
  reviewerName: "Tracy Montgomery",
  reviewerRating: "5",
  reviewerNotes: "This place is great!",
});

//Step 2, 2 of 2
//Next step, go to server.js file to set up requests
db.Reviews.remove({}, function(err, reviews){
  db.Reviews.create(reviewList, function(err, reviews){
    if (err) { return console.log('ERROR', err); }
    console.log("all reviews:", reviews);
    console.log("created", reviews.length, "reviews");
    process.exit();
  });
});
