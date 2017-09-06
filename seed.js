var db = require('./models');

//Step 1, 1 of 2: This sets up your API
 var venueList = [];
 venueList.push({
        name: "One Montgomery Terrace",
        streetAddress: "137 Sutter Street",
        gpsCoordinates:[{
          lat: 37.789494,
          long: -122.402588,
        }],
        crossStreet: "Montgomery and Sutter Street",
        photo: "http://gatetoadventures.com/wp-content/uploads/2015/08/One-Montgomery-Terrace-4-800x532.jpg",
        notes: "There are two ways to get here. You can go inside the Crocker Galleria (50 Post St) and take the escalator up to the third floor. From there look for a hallway with the sign “Roof Garden”. The other way to get there is via the elevator inside the Wells Fargo Building (1 Montgomery St. not the bank, see photo below). If you stand on the corner of Montgomery and Post St, walk up a few steps at the One Montgomery Building. There are two doors.  The right door is the entrance to the Wells Fargo Bank. Take the door on your left to get to the elevators up to the Rooftop Garden Terrace. Big advantage of this terrace is that you can pick up food from any of the stores inside the Crocker Galleria and bring it up to the terrace to enjoy it.",
      });
