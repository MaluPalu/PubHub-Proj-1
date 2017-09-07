
$(document).ready(function() {

  function handleUpdate(e, id, form) {
    e.preventDefault();
    console.log(form);
    console.log($(form).serialize());
    $.ajax({
      method: "PUT",
      url: '/api/pubHub/' + id,
      data: $(form).serialize(),
      success: renderPubs,
      error: handleError
    })
  }
  function handleDeletePub(e, id) {
  e.preventDefault();
  var currentDeleteId = $(this).closest('.pubHub').data('pub-id');
  console.log(currentDeleteId);
  $.ajax({
    method: 'DELETE',
    url: '/api/pubHub/' + id,
    success: handleDeletedPub,
    error: handleError
  })
}
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url:'api/pubHub',
    success: renderPubs,
    error: handleError,
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
  $.ajax({
    method: 'GET',
    url: '/api/reviews',
    error: handleError
  });
  function renderPubs(pubs) {
    console.log(pubs);
    for (let i = 0; i < pubs.length; i++) {
      renderPub(pubs[i]);
    }

  $('#edit-pubHub-modal').on("shown.bs.modal", function (e) {
  });
  $('#pubSubmit').on("submit", function (e) {
      console.log('save button clicked');
      var currentPubId = $(this).find('.pubHub').data('pub-id');
      handleUpdate(e, currentPubId, this);
  });
  $('#pubs').on("click", '.deletePubHub', function (e) {
    console.log('delete button clicked');
    var currentPubId = $(this).closest('.pubHub').data('pub-id');
    handleDeletePub(e, currentPubId);
  });

    // initMap(pubs);
  };
 function handleDeletedPub(data) {
   var deletedPubId = data._id;
   $('div[data-pub-id=' + deletedPubId + ']').remove();
 }
  function handleError(err){
    console.log('There has been an error: ', err);
  }
  function renderPub(pub) {
    var myPubs = (`
      <div class="pubHub col-sm-6" data-pub-id="${pub._id}">
        <div class="panel-body list-group-item" style="background-image: url(${pub.photo}); background-repeat: no-repeat; background-size: 100% 100%">

          <!-- begin pubHub internal row -->
          <div class="row" style="margin-bottom: 15px;">
            <div class="col-sm-12 col-xs-12">
              <img class="img-responsive img-card" src="${pub.photo}" />
            </div>
            </div>
            <div class="row>"
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
                  <p class="Hub-notes">${pub.notes}</p>
                </li>
              </ul>
              <li class="list-group-item">
                <button class='btn btn-info tgl-btn editPubHub' style="width: 125px" data-toggle="modal" data-target="#edit-pubHub-modal">Edit Notes</button>
                <button class='btn btn-danger deletePubHub' style="width: 125px">Delete</button>
                <button class='btn btn-info reviewPubHub' style="width: 125px"><a href="/reviews">Reviews</a></button>
              </li>
            </div>
            </div>
          </div>
        </div>
      </div>

    </div>`)
    $('#pubs').append(myPubs);
  };

});
