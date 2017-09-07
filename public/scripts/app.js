
$(document).ready(function() {

  function handleUpdate(e, id, form) {
    e.preventDefault();
    console.log(form);
    console.log($(form).serialize());
    $.ajax({
      method: "PUT",
      url: '/api/cliffs/' + id,
      data: $(form).serialize(),
      success: function() {
        window.location = '/'
      },
      error: handleError
    })
  }
  console.log('app.js loaded!');
  $.ajax({
    method: 'GET',
    url: '/api/pubHub',
    success: renderPub,
    error: handleError
  });

  $.ajax({
    method: 'GET',
    url: '/api/pubHub/reviews',
    success: renderReviews,
    error: handleError
  });

  $('#pubSubmit').on("submit", function(event) {
    console.log('in singlebutton submit');
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: 'api/pubHub',
      data: $(this).serialize(),
      success: renderPub,
      error: handleError
    })
  });
  function renderPubs(pubs) {
    for (let i = 0; i < pubs.length; i++) {
      renderPub(pubs[i]);
    }
    // initMap(pubs);
  };
  function handleError(err){
    console.log('There has been an error: ', err);
  }
  function renderPub(pub) {
    var myPubs = (`
      <div class="pubHub col-sm-6 col-sm-offset-1" data-pub-id="${pub._id}">
        <div class="panel-body list-group-item" style="background-color: blue">

          <!-- begin pubHub internal row -->
          <div class="row">
            <div class="col-sm-4 col-xs-12">
              <img class="img-responsive" src="${pub.photo}" style="width: 100%" />
            </div>
            <div class="col-sm-8 col-xs-12" style="color:black">
              <ul class="list-group">
                <li class="list-group-item">
                  <h5 class='inline-header'><b>Name: </b></h5>
                  <span>${pub.nameHub}</span>
                </li>
                <li class="list-group-item">
                  <h5><b>Street Address: </b></h5>
                  <span>${pub.streetAddress}</span>
                </li>
                <li class="list-group-item">
                  <h5><b>Cross Street: </b></h5>
                  <span>${pub.crossStreet}</span>
                </li>
                <li class="list-group-item">
                  <h5><b>Notes: </b></h5>
                  <p class="pubHub-notes">${pub.notes}</p>
                </li>
              </ul>
              <li class="list-group-item">
                <button class='btn btn-info edit-pubHub tgl-btn' style="width: 125px">Edit Notes</button>
                <button class='btn btn-danger delete-pubHub' style="width: 125px">Delete</button>
                <button class='btn btn-info review-pubHub' style="width: 125px">Reviews</button>
              </li>
            </div>
          </div>
        </div>
      </div>
      <!-- end of pubHub internal row -->
      <!-- end one pubHub -->

    </div>`)
    $('#pubs').append(myPubs);
  };

});
