
$(document).ready(function() {

  // Set up object to hold marker references
  var markers = {};

  //BEGIN maps: Renders the map on the page
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 13,
  });
  //END maps

  //AJAX call that PUTS updated information onto pre-existing PubHub upon success
  function handleUpdate(e, id, form) {
    e.preventDefault();
    $.ajax({
      method: "PUT",
      url: '/api/pubHub/' + id,
      data: $(form).serialize(),
      success: handleUpdatedPub,
      error: handleError
    });
  }

  //AJAX call that DELETES the selected PubHub id upon success
  function handleDeletePub(e, id) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/pubHub/' + id,
      success: function(data) {
        $('div[data-pub-id=' + id + ']').remove();
        handleDeletedPub(data);
      },
      error: handleError
    });
  }
  //AJAX call that GETS all existing PubHubs in the DB and calls the render function
  $.ajax({
    method: 'GET',
    url:'api/pubHub',
    success: renderPubs,
    error: handleError,
  });
  //Ajax call to POST form onto /api/pubHub page
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
  //Function that renders all seeded Pubs and a single pub whenever it is called
  function renderPubs(pubs) {
    for (let i = 0; i < pubs.length; i++) {
      renderPub(pubs[i]);
    }
    //Opens modal---
    $('#edit-pubHub-modal').on("shown.bs.modal", function (e) {
    });
    //Function that calls submit and send the data information to the handleUpdate function in a callback and then hides the modal
    $('#pubSubmit').on("submit", function (e) {
      var currentPubId = $('#edit-pubHub-modal').data('pubhub-id');
      handleUpdate(e, currentPubId, this);
      $('#edit-pubHub-modal').modal('hide');
    });
    //Resets the modal everytime its opened so pre-existing text does not show up again
    $('#edit-pubHub-modal').on('hidden.bs.modal', function(){
      $(this).find('#pubSubmit')[0].reset();
    });
    //Delete function
    $('#pubs').on("click", '.deletePubHub', function (e) {
      var currentPubId = $(this).closest('.pubHub').data('pub-id');
      handleDeletePub(e, currentPubId);
    });
  };
  //Function that has the specific id and starts from the containing div of that id and finds the classes to chenge HTML
  function handleUpdatedPub(data) {
    var updatedPubId = data._id;
    var updatedDiv = $('div[data-pub-id=' + updatedPubId + ']');
    updatedDiv.find('.pubName').html(data.nameHub);
    updatedDiv.find('.pubAddress').html(data.streetAddress);
    updatedDiv.find('.pubCross').html(data.crossStreet);
    updatedDiv.find('.pubNotes').html(data.notes);
    updatedDiv.find('#bckImg').css('background-image', 'url(' + data.photo+ ')');
  }
  //Function to delete Pub
  function handleDeletedPub(data) {
    // Retrieve marker reference from "markers" object and remove as per Google docs
    markers[data._id].setMap(null);

    var deletedPubId = data._id;
    $('div[data-pub-id=' + deletedPubId + ']').remove();
  }
  //Whenever called describes the error
  function handleError(err){
    console.log('There has been an error: ', err);
  }


  //Renders a single pub when form is submitted
  function renderPub(pub) {
    var marker = new google.maps.Marker({
      position: {
        lat: pub.gpsCoords.lat,
        lng: pub.gpsCoords.long,
      },
      map: map
    });

    // Store reference to specific marker in "markers" object
    markers[pub._id] = marker;


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
      <a class='btn btn-info reviewPubHub' style="width: 125px; margin-right: 10px" href="/pubHub/${pub._id}/reviews">
      Reviews
      </a>
      </li>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>`);
      //Function inside rendered Pub so that last appended Pub has click events
      //Finds the update button that was last
      $('#pubs').append(myPubs);
      $('#pubs').find('.editPubHub').last().on("click", function() {
        $('#edit-pubHub-modal').data('pubhub-id', $(this).data('pubhub-id'));
      });
    };
  });
