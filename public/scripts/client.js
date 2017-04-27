$(document).ready( onReady );

function onReady () {
  // console.log( 'JQ' );
  $('#addButton').on('click', addKoala );
  getKoalas();
  koalaDropdown();
  // on dropdown change, run fillInputFields function, which adds selected koala info
  $( '#koalaDropdown' ).change( fillInputFields );
  $('#editButton').on( 'click', editKoala );
  $('#deleteButton').on( 'click', deleteKoala );
} // end onReady

// get all koalas from the database and display
function getKoalas(){
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function (response){
      console.log('back from server' + response);
      $('#viewKoalas').empty();
      $('#viewKoalas').append('<h2>Add Koala</h2>');
      for (var i = 0; i < response.length; i++) {
        // console.log(response[i]);
        // append koala info at index i to DOM
        $('#viewKoalas').append('<div><h3>Name: ' + response[i].name + '</h3><p>Age: ' + response[i].age + '</p><p>Sex: ' + response[i].sex + '</p><p>Ready for transfer: ' + response[i].ready_for_transfer + '</p><p>notes: ' + response[i].notes + '</p></div>');
      } // end for
    } // end success
  }); // end ajax get /getKoalas
}//end getKoalas

// add new koala to database
function addKoala () {
  console.log('in addKoala');
  var objectToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    sex: $('#sexIn').val(),
    ready_for_transfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val()
  }; // end objectToSend
  console.log('objectToSend: ', objectToSend);
  $.ajax({
    url: '/addKoala',
    type: 'POST',
    data: objectToSend,
    success: function ( response ) {
      getKoalas();
      koalaDropdown();
      clearAddInputFields();
    } // end success
  }); // end ajax POST addKoala
} // end addKoala

function clearAddInputFields() {
  $('#nameIn').val('');
  $('#ageIn').val('');
  $('#sexIn').val('');
  $('#readyForTransferIn').val('');
  $('#notesIn').val('');
}

function koalaDropdown() {
  //GET
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( response ) {
      $('#koalaDropdown').empty();
      $('#koalaDropdown').append( '<option value="empty">Select a Koala</option>' );
      for (var i = 0; i < response.length; i++) {
        $( '#koalaDropdown' ).append('<option value="' + response[i].name + '">' + response[i].name + '</option>');
      }
    }
  });
} // end koalaDropdown

function fillInputFields() {
  console.log('input field changed');
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( response ) {
      for (var i = 0; i < response.length; i++) {
        if( $('#koalaDropdown').val() === response[i].name ){
          $( '#nameEditIn' ).val( response[i].name );
          $( '#ageEditIn' ).val( response[i].age );
          $( '#sexEditIn' ).val( response[i].sex );
          $( '#readyForTransferEditIn' ).val( response[i].ready_for_transfer );
          $( '#notesEditIn' ).val( response[i].notes );
        } // end of if
      } // end of for
    } // end success
  }); // end ajax
} // end fillInputFields

function editKoala() {

  var objectToEdit = {
    name: $('#nameEditIn').val(),
    age: $('#ageEditIn').val(),
    sex: $('#sexEditIn').val(),
    ready_for_transfer: $('#readyForTransferEditIn').val(),
    notes: $('#notesEditIn').val()
  };

  // POST
  $.ajax({
    url: '/editKoala',
    type: 'POST',
    data: objectToEdit,
    success: function( response ) {
      console.log( response );
      getKoalas();
      koalaDropdown();
      clearEditInputFields();
    }
  }); // end ajax
} // end editKoala

function clearEditInputFields() {
  $('#nameEditIn').val('');
  $('#ageEditIn').val('');
  $('#sexEditIn').val('');
  $('#readyForTransferEditIn').val('');
  $('#notesEditIn').val('');
}

function deleteKoala(  ) {
  var objectToRemove = {
    selectedDropdown: $('#koalaDropdown').val(),
  };
  //POST
  $.ajax({
    url: '/deleteKoala',
    type: 'POST',
    data: objectToRemove,
    success: function ( response ) {
      console.log( response );
      getKoalas();
      koalaDropdown();
      clearEditInputFields();
    }
  });
} // end deleteKoala
