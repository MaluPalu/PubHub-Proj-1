$(document).ready(function() {
  //Find the specific parameter where the PubHub Id is
  if (window.location.pathname.split('/').length < 3) {
    window.location = '/';
  }

  //Set that PubHub Id to a variable to use in our ajax calls
var pubHubId = window.location.pathname.split('/')[2];

$.ajax({
  method: 'GET',
  url: '/api/pubHub/' + pubHubId + '/reviews',
  success: renderReviews + renderTitle + renderImg,
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

function handleUpdatedReview(data) {
  //Sets the object Review recieved from the database to ._id
  var updatedReviewId = data._id;
  //Selects the div with the attr data-review-id and sets that attribute to data._id
  var updatedReview = $('div[data-review-id=' + updatedReviewId + ']');
  //Find the descendants of currently selected div and changes the html within those
  updatedReview.find('.reviewerName').html(data.reviewerName);
  updatedReview.find('.reviewerRating').html(data.reviewerRating);
  updatedReview.find('.reviewerNotes').html(data.reviewerNotes);
}

function handleDeleteReview(e, id) {
  console.log("In delete ", id);
  e.preventDefault();
  $.ajax({
    method: 'DELETE',
    url: '/api/pubHub/' + pubHubId + '/reviews/' + id,
    success: function() {
      $('div[data-review-id=' + id + ']').remove();
    },
    error: handleError
  })
}

function handleError(err){
  console.log('There has been an error: ', err);
}
//Step 1a, 2 of 3:
//This runs through the forEach loop. Each item in the api will be shown and the renderVenue will display this per the function below
function renderReviews(reviews) {
  reviews.forEach(function(review) {
    renderReview(review);
  });

function renderTitles(titles) {
  titles.forEach(function(title) {
    renderTitle(title);
  });
}
  $('#reviewSubmit').on("submit", function (e) {
    var currentReviewId = $('#edit-review-modal').data('review-id');
    handleReviewUpdate(e, currentReviewId, this);
    $('#edit-review-modal').modal('hide');
  });
  //Allows modal to reset the last things you inputed in previous modal
  $('#edit-review-modal').on('hidden.bs.modal', function(){
    $(this).find('#reviewSubmit')[0].reset();
  });
  $('#review-form').on("click", '.deleteReview', function (e) {
    console.log("Closest review class ", $(this).closest('.reviewClass'));
    var currentReviewId = $(this).closest('.reviewClass').data('review-id');
    console.log(currentReviewId);

    handleDeleteReview(e, currentReviewId)
    });
}



//Step 1a, part 3 of 3:
function renderReview(review) {
  var reviewHtml = (`
    <div class="row reviewClass" data-review-id="${review._id}" style="margin-bottom: 15px;">
  <div class="col-sm-12">
    <div class="col-sm-6" style="text-align: left; padding-left: 0">
      <h4><b class="reviewerName">${review.reviewerName}</b></h4>
    </div>
    <div class="col-sm-6" style="text-align: right; padding-left: 0">      <h4><b class="reviewerRating">${review.reviewerRating} Stars</b></h4></div>
    </div>

  <div class="row">
  <div class="col-sm-12">
  <h4><b>Review:</b></h4>
  </div>
  </div>
  <div class="row">
  <div class="col-sm-12">
  <p class="reviewerNotes">${review.reviewerNotes}</p>
  </div>
  <div class="col-sm-12">
  <span>
  <button class='btn btn-info tgl-btn editReview' data-review-id="${review._id}" data-view-id="inserthere" style="width: 125px; margin-right: 10px;" data-toggle="modal" data-target="#edit-review-modal">Edit Review</button>
  <button class='btn btn-danger deleteReview' style="width: 125px; margin-right: 10px;">Delete</button>
  </span>
  </div>
  </div>
  </div>
  </div>
</div>
  <!-- END review form -->`);
  $("#review-form").append(reviewHtml);
  $('#review-form').find('.editReview').last().on("click", function() {
    $('#edit-review-modal').data('review-id', $(this).data('review-id'));
});
}

});
