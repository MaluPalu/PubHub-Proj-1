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
  notes: "There are two ways to get here. You can go inside the Crocker Galleria (50 Post St) and take the escalator up to the third floor. From there look for a hallway with the sign “Roof Garden”. The other way to get there is via the elevator inside the Wells Fargo Building (1 Montgomery St. not the bank, see photo below). If you stand on the corner of Montgomery and Post St, walk up a few steps at the One Montgomery Building. There are two doors.  The right door is the entrance to the Wells Fargo Bank. Take the door on your left to get to the elevators up to the Rooftop Garden Terrace. Big advantage of this terrace is that you can pick up food from any of the stores inside the Crocker Galleria and bring it up to the terrace to enjoy it.",
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
