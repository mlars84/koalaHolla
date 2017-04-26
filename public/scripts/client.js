$(document).ready( onReady );

function onReady () {
  console.log( 'JQ' );
  getKoalas();
}

function getKoalas(){

      $.ajax({
        url: '/getKoalas',
        type: 'GET',
        success: function (response){
          console.log('back from server' + response);
        }
      });

}//end getKoalas
