$(document).ready(function() {


$.ajax({
  method: 'GET',
  url: '/api/pubHub/reviews',
  success: renderReviews,
  error: handleError
});

var renderReviews = console.log("Reviews Rendered!")

function handleError(err){
  console.log('There has been an error: ', err);
}
//Step 1a, 2 of 3:
//This runs through the forEach loop. Each item in the api will be shown and the renderVenue will display this per the function below
function renderMultipleReviews(reviews) {
  venues.forEach(function(review) {
    renderReview(review);
  });
}

//Step 1a, part 3 of 3:
function renderReview(review) {
  var reviewHtml = (`<p>reviews posting?</p>`);
  $("#review-form").prepend(reviewHtml);
}


});
