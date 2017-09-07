$(document).ready(function() {


$.ajax({
  method: 'GET',
  url: '/api/reviews',
  success: renderReviews,
  error: handleError
});

var renderReviews = console.log("Reviews Rendered!")

function handleError(err){
  console.log('There has been an error: ', err);
}
//Step 1a, 2 of 3:
//This runs through the forEach loop. Each item in the api will be shown and the renderVenue will display this per the function below
function renderReviews(reviews) {
  reviews.forEach(function(review) {
    renderReview(review);
  });
}

//Step 1a, part 3 of 3:
function renderReview(review) {
  var reviewHtml = (`<div class="row" data-review-id="${review._id}" style="margin-bottom: 15px;">
  <div class="col-sm-6">
  <h4><b>${review.reviewerName}</b></h4>
  </div>
  <div class="col-sm-6" style="text-align: right">
  <span><h4><b>${review.reviewerRating} Stars</b></h4></span>
  </div>
  </div>
  <div class="row">
  <div class="col-sm-12">
  <h4><b>Review:</b></h4>
  </div>
  </div>
  <div class="row">
  <div class="col-sm-12">
  <p>${review.reviewerNotes}</p>
  </div>
  </div>
  </div>
  <!-- END review form -->`);
  $("#review-form").prepend(reviewHtml);
}


});
