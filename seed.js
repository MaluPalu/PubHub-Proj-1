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


//Step 2, 1 of 2: This sets up your Reviewer API
var reviewList = [];
reviewList.push({
  pubHubName: "One Montgomery Terrace",
  reviewerName: "Tracy Montgomery",
  reviewerRating: "5",
  reviewerNotes: "This place is great!",
}, {
  pubHubName: "St Mary’s Square",
  reviewerName: "Jen Warner",
  reviewerRating: "5",
  reviewerNotes: "This place is tidy!",
});

//Step 1, 2 of 2
//Next step, go to server.js file to set up requests
db.PubHub.remove({}, function(err, pubHubs){
  db.PubHub.create(pubHubList, function(err, pubHubs){
    if (err) { return console.log('ERROR', err); }
    console.log("all pubHubs:", pubHubs);
    console.log("created", pubHubs.length, "pubHubs");
    // Now that PubHubs are created, set up reviews for them.
    db.Reviews.remove({}, function(err, reviews){
      // set up a variable to track how many reviews are successfully created
      let success = 0;
      for (let review of reviewList) {
        // Find the right PubHub so we can set it within the review
        db.PubHub.find({nameHub: review.pubHubName}, function(err, foundPH) {
          // But add in the pubHub that we found!
          review.pubHubId = foundPH[0]._id;
          console.log(review);
          console.log(foundPH)
          db.Reviews.create(review, function(err, createdReview) {
            console.log("Created review", createdReview);
            // check if we've created them all successfully yet, to exit process
            success++;
            if (success >= reviewList.length) {
              process.exit();
            }
          })
        })
      }
    });
  });
});
