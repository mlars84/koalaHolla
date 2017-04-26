$(document).ready( onReady );

function onReady () {
  console.log( 'JQ' );
  getKoalas();
}

// get all koalas from the database and display
function getKoalas(){
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function (response){
      console.log('back from server' + response);
      for (var i = 0; i < response.length; i++) {
        // console.log(response[i]);
        // append koala info at index i to DOM
        $('#viewKoalas').append('<div><p>Name: ' + response[i].name + '</p><p>Age: ' + response[i].age + '</p><p>Sex: ' + response[i].sex + '</p><p>Ready for transfer: ' + response[i].ready_for_transfer + '</p><p>notes: ' + response[i].notes + '</p></div>');
      } // end for
    } // end success
  }); // end ajax get /getKoalas
}//end getKoalas
