
$(document).ready(function() {

  //BEGIN maps
  // function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 13,
    });
  //END maps

  //Runs PUT request
  function handleUpdate(e, id, form) {
    e.preventDefault();
    $.ajax({
      method: "PUT",
      url: '/api/pubHub/' + id,
      data: $(form).serialize(),
      success: handleUpdatedPub,
      error: handleError
    })
  }

  //
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
    //
  $.ajax({
    method: 'GET',
    url:'api/pubHub',
    success: renderPubs,
    error: handleError,
  });
    //
  $('.createMe').on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/pubHub',
      data: $(this).serialize(),
      success: renderPub,
      error: handleError
    });
    $(this).trigger("reset");
  });
    //
  function renderPubs(pubs) {
    console.log(pubs);
    for (let i = 0; i < pubs.length; i++) {
      renderPub(pubs[i]);
    }
    //
    $('#edit-pubHub-modal').on("shown.bs.modal", function (e) {
    });
    //
    $('#pubSubmit').on("submit", function (e) {
      var currentPubId = $('#edit-pubHub-modal').data('pubhub-id');
      handleUpdate(e, currentPubId, this);
      $('#edit-pubHub-modal').modal('hide');
    });
    //
    $('#edit-pubHub-modal').on('hidden.bs.modal', function(){
      $(this).find('#pubSubmit')[0].reset();
    });
    //
    $(document).on("click", ".editPubHub", function (e) {
      $('#edit-pubHub-modal').data('pubhub-id', $(this).data('pubhub-id'));
    })
    $('#pubs').on("click", '.deletePubHub', function (e) {
      var currentPubId = $(this).closest('.pubHub').data('pub-id');
      handleDeletePub(e, currentPubId);
    });
    // initMap(pubs);
  };
    //Finds
  function handleUpdatedPub(data) {
    var updatedPubId = data._id;
    var updatedDiv = $('div[data-pub-id=' + updatedPubId + ']');
    updatedDiv.find('.pubName').html(data.nameHub);
    updatedDiv.find('.pubAddress').html(data.streetAddress);
    updatedDiv.find('.pubCross').html(data.crossStreet);
    updatedDiv.find('.pubNotes').html(data.notes);
    updatedDiv.find('#bckImg').css('background-image', 'url(' + data.photo+ ')');
  }
    //
  function handleDeletedPub(data) {
    var deletedPubId = data._id;
    $('div[data-pub-id=' + deletedPubId + ']').remove();
  }
    //
  function handleError(err){
    console.log('There has been an error: ', err);
  }
    //
  function renderPub(pub) {
    var marker = new google.maps.Marker({
         position: {
           lat: pub.gpsCoords.lat,
           lng: pub.gpsCoords.long,
         },
         map: map
       });
    var myPubs = (`
      <div class="pubHub col-sm-6" data-pub-id="${pub._id}" style="padding: 15px; min-height: 300px">
      <div id="bckImg" class="panel-body list-group-item" style="background-image: url('${pub.photo}'); background-repeat: no-repeat; background-size: 100% 100%">

      <!-- begin pubHub internal row -->
      <div class="row>"
      <div class="col-sm-8 col-xs-12" style="color:black">
      <ul class="list-group">
      <li class="list-group-item">
      <h5 class='inline-header'><b>Name: </b></h5>
      <span class="pubName">${pub.nameHub}</span>
      </li>
      <li class="list-group-item">
      <h5><b>Street Address: </b></h5>
      <span class="pubAddress" >${pub.streetAddress}</span>
      </li>
      <li class="list-group-item">
      <h5><b>Cross Street: </b></h5>
      <span class="pubCross" >${pub.crossStreet}</span>
      </li>
      <li class="list-group-item">
      <h5><b>Notes: </b></h5>
      <p class="pubNotes">${pub.notes}</p>
      </li>
      </ul>
      <li class="list-group-item">
        <button class='btn btn-info tgl-btn editPubHub' data-pubhub-id="${pub._id}" style="width: 125px; margin-right: 10px" data-toggle="modal" data-target="#edit-pubHub-modal">Edit Notes</button>
        <button class='btn btn-danger deletePubHub' style="width: 125px; margin-right: 10px">Delete</button>
        <a class='btn btn-info reviewPubHub' style="width: 125px; margin-right: 10px" href="/reviews">
          Reviews
        </a>
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
