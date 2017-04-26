// requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 6789;
var pg = require('pg');

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// spin up server
app.listen( port, function (req, res) {
  console.log('server up on port:', port);
});

// base url
app.get( '/', function (req, res) {
  console.log(' hit on base url ');
  res.sendFile( path.resolve( 'public/views/index.html' ) );
});

app.get( '/getKoalas', function (req, res) {
  console.log(' /getKoalas get hit ');
  //add database call here
  res.sendStatus(200);
});
