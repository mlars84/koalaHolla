$(document).ready( onReady );

function onReady () {
  // console.log( 'JQ' );
  $('#addButton').on('click', addKoala );
  getKoalas();
}

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
    } // end success
  }); // end ajax POST addKoala
} // end addKoala
