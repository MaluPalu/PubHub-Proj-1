$(document).ready(function() {
  if (window.location.pathname.split('/').length < 3) {
    window.location = '/';
  };
var pubHubId = window.location.pathname.split('/')[2];

console.log("pathname = ", window.location.pathname);
console.log("pubHubId = ", pubHubId);
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
function handleReviewUpdate(e, id, form) {
  e.preventDefault();
  $.ajax({
    method: "PUT",
    url: '/api/pubHub/' + pubHubId + '/reviews/' + id,
    data: $(form).serialize(),
    success: handleUpdatedReview,
    error: handleError
  })
}

//Submits modal form and updates the rendered pubHub with whatever got changed then hides the modal
$('#reviewSubmit').on("submit", function (e) {
  var currentReviewId = $('#edit-review-modal').data('review-id');
  handleReviewUpdate(e, currentReviewId, this);
  $('#edit-review-modal').modal('hide');
});
//Allows modal to reset the last things you inputed in previous modal
$('#edit-pubHub-modal').on('hidden.bs.modal', function(){
  $(this).find('#pubSubmit')[0].reset();
});

function handleError(err){
  console.log('There has been an error: ', err);
}
function handleUpdatedReview(data) {
  //Sets the object PubHum recieved from the database to ._id
  var updatedReviewId = data._id;
  //Selects the div with the attr data-pub-id and sets that attribute to data._id
  var updatedReview = $('div[data-review-id=' + updatedReviewId + ']');
  //Find the descendants of currently selected div and changes the html within those
  updatedDiv.find('.reviewerName').html(data.reviewerName);
  updatedDiv.find('.reviewerRating').html(data.reviewerRating);
  updatedDiv.find('.reviewerNotes').html(data.reviewerNotes);
}

function renderReviews(reviews) {
  console.log(reviews);
  for (let i = 0; i < reviews.length; i++) {
    renderReview(reviews[i]);
  };
};



//Step 1a, part 3 of 3:
function renderReview(review) {
  var reviewHtml = (`
    <div class="review-card">
    <div class="row" data-review-id="${review._id}" style="margin-bottom: 15px;">
    <div class="col-sm-12">
    <div class="col-sm-6" style="text-align: left; padding-left: 0">
    <h4><b>${review.reviewerName}</b></h4>
    </div>
    <div class="col-sm-6" style="text-align: right; padding-left: 0"><h4><b>${review.reviewerRating} Stars</b></h4></div>
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
    <button class='btn btn-info tgl-btn editReview' data-view-id="inserthere" style="width: 125px; margin-right: 10px;" data-toggle="modal" data-target="#edit-review-modal" data-review-id="${review._id}">Edit Review</button>
    <button class='btn btn-danger deleteReview' style="width: 125px; margin-right: 10px;">Delete</button>
    </span>
    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- END review form -->`);
    $("#review-form").append(reviewHtml);
    $('#review-form').find('.editReview').last().on("click", function (e) {
      $('#edit-review-modal').data('review-id', $(this).data('review-id'));
});
};
});
