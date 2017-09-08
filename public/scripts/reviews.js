$(document).ready(function() {
  if (window.location.pathname.split('/').length < 3) {
    window.location = '/';
  }


var pubHubId = window.location.pathname.split('/')[2];

$.ajax({
  method: 'GET',
  url: '/api/pubHub/' + pubHubId + '/reviews',
  success: renderReviews,
  error: handleError
});

$('.createReview').on("submit", function(event) {
  console.log("ds");
  event.preventDefault();
  console.log($(this).serialize());
  console.log("pathname = ", window.location.pathname);
  console.log("pubHubId = ", pubHubId);
  $.ajax({
    method: 'POST',
    url: '/api/pubHub/' + pubHubId + '/reviews',
    data: $(this).serialize(),
    success: renderReview,
    error: handleError
  })
});
// function handleReviewUpdate(e, id, form) {
//   e.preventDefault();
//   $.ajax({
//     method: "PUT",
//     url: '/api/pubHub/' + pubHubId + '/reviews/' + id,
//     data: $(form).serialize(),
//     success: handleUpdatedReview,
//     error: handleError
//   })
// }

// function handleDeleteReview(e, id) {
//   e.preventDefault();
//   $.ajax({
//     method: 'DELETE',
//     url: '/api/pubHub/' + pubHubId + '/reviews/' + id,
//     success: function() {
//       $('div[data-review-id=' + id + ']').remove();
//     },
//     error: handleError
//   })
// }

function handleError(err){
  console.log('There has been an error: ', err);
}
//Step 1a, 2 of 3:
//This runs through the forEach loop. Each item in the api will be shown and the renderVenue will display this per the function below
function renderReviews(reviews) {
  console.log(reviews);
  reviews.forEach(function(review) {
    console.log('This is a review: ', review);
    renderReview(review);
  });
}



//Step 1a, part 3 of 3:
function renderReview(review) {
  var reviewHtml = (`
<form class="review-card">
    <div class="row" data-review-id="${review._id}" style="margin-bottom: 15px;">
  <div class="col-sm-12">
    <div class="col-sm-6" style="text-align: left; padding-left: 0">
      <h4><b>${review.reviewerName}</b></h4>
    </div>
    <div class="col-sm-6" style="text-align: right; padding-left: 0">      <h4><b>${review.reviewerRating} Stars</b></h4></div>
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
  <div class="col-sm-12">
  <span>
  <button class='btn btn-info tgl-btn editReview' data-view-id="inserthere" style="width: 125px; margin-right: 10px;" data-toggle="modal" data-target="#edit-review-modal">Edit Review</button>
  <button class='btn btn-danger deleteReview' style="width: 125px; margin-right: 10px;">Delete</button>
  </span>
  </div>
  </div>
  </div>
  </div>
  </form>
  <!-- END review form -->`);
  $("#review-form").prepend(reviewHtml);
}


});
