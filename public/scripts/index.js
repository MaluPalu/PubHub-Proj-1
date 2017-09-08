
$(document).ready(function() {
  //The AJAX call that UPDATES the object in the API from selected pubhub form
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
  //The AJAX call that DELETES any object in the API that is selected
  //handleDeletePub gets passed id from jQuery
  function handleDeletePub(e, id) {
    e.preventDefault();
    $.ajax({
      method: 'DELETE',
      url: '/api/pubHub/' + id,
      success: function() {
        $('div[data-pub-id=' + id + ']').remove();
      },
      error: handleError
    })
  }
  //The AJAX call to the API that GETS and of the objects in the API and on success renders them to the page
  $.ajax({
    method: 'GET',
    url:'api/pubHub',
    success: renderPubs,
    error: handleError,
  });
  //The AJAX call to the API that POST to the API
  $('.createPubHub').on("submit", function(event) {
    event.preventDefault();
    console.log($(this).serialize());
    $.ajax({
      method: 'POST',
      url: '/api/pubHub',
      data: $(this).serialize(),
      success: renderPub,
      error: handleError
    })
  });
  //Renders all pubs from the database and when renderPub is called will append another pub
  function renderPubs(pubs) {
    console.log(pubs);
    for (let i = 0; i < pubs.length; i++) {
      renderPub(pubs[i]);
    }
    //Submits modal form and updates the rendered pubHub with whatever got changed then hides the modal
    $('#pubSubmit').on("submit", function (e) {
      var currentPubId = $('#edit-pubHub-modal').data('pubhub-id');
      handleUpdate(e, currentPubId, this);
      $('#edit-pubHub-modal').modal('hide');
    });
    //Allows modal to reset the last things you inputed in previous modal
    $('#edit-pubHub-modal').on('hidden.bs.modal', function(){
      $(this).find('#pubSubmit')[0].reset();
    });

    $('#pubs').on("click", '.deletePubHub', function (e) {
      var currentPubId = $(this).closest('.pubHub').data('pub-id');
      handleDeletePub(e, currentPubId);
    });
    // initMap(pubs);
  };

  function handleUpdatedPub(data) {
    //Sets the object PubHum recieved from the database to ._id
    var updatedPubId = data._id;
    //Selects the div with the attr data-pub-id and sets that attribute to data._id
    var updatedDiv = $('div[data-pub-id=' + updatedPubId + ']');
    //Find the descendants of currently selected div and changes the html within those
    updatedDiv.find('.pubName').html(data.nameHub);
    updatedDiv.find('.pubAddress').html(data.streetAddress);
    updatedDiv.find('.pubCross').html(data.crossStreet);
    updatedDiv.find('.pubNotes').html(data.notes);
    updatedDiv.find('#bckImg').css('background-image', 'url(' + data.photo+ ')');
  }
  //function to allow err messages in the console to display what the err is
  function handleError(err){
    console.log('There has been an error: ', err);
  }
  //renders a single pub with this template whwnver renderPub is called
  function renderPub(pub) {
    var myPubs = (`
      <div class="pubHub col-sm-6" data-pub-id="${pub._id}">
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
      <!--This button has an id so that the modal knows which pubHub it works with-->
      <button class='btn btn-info tgl-btn editPubHub' data-pubhub-id="${pub._id}" style="width: 125px" data-toggle="modal" data-target="#edit-pubHub-modal">Edit Notes</button>
      <button class='btn btn-danger deletePubHub' style="width: 125px">Delete</button>
      <button class='btn btn-info reviewPubHub' style="width: 125px"><a href="/reviews/${pub._id}">Reviews</a></button>
      </li>
      </div>
      </div>
      </div>
      </div>
      </div>

      </div>`)
      $('#pubs').append(myPubs);
      //Tell the modal which pubhub-id we are working with
      $('#pubs').find('.editPubHub').last().on("click", function (e) {
        $('#edit-pubHub-modal').data('pubhub-id', $(this).data('pubhub-id'));
      })
    };
  });
