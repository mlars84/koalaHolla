// requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 6789;
var pg = require('pg');

// set up config for the pool
var config = {
  database: 'koalaHolla',
  host: 'localhost',
  port: 5432,
  max: 10
};

// new pool using config ^
var pool = new pg.Pool( config );

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


var koalasArray = [];

app.get( '/getKoalas', function ( req, res ) {
  console.log(' /getKoalas get hit ');
  //add database call here
  koalasArray = [];
  pool.connect(function( err, connection, done ){
    if (err){
      console.log(err);
      res.sendStatus( 400 );
    }
    else{
      console.log('connect to DB');
      var resultSet = connection.query( "SELECT * FROM koalas" );
      resultSet.on( 'row', function( row ) {
        koalasArray.push( row );
      }); // end on row
      resultSet.on('end', function() {
        done();
        res.send( koalasArray );
      }); // end on end
    } // end no error
  }); // end pool.connect
}); // end /getKoalas

app.post( '/addKoala' , function (req, res) {
  // console.log('addKoala hit with ', req);
  // console.log('req.body ', req.body);
  pool.connect(function( err, connection, done ){
    if (err){
      console.log(err);
      res.sendStatus( 400 );
    }
    else{
      console.log('connect to DB');
      console.log( "INSERT INTO koalas ( name, age, sex, ready_for_transfer, notes ) VALUES ( '" + req.body.name + "' , " + req.body.age + " , '" + req.body.sex + "' , '" + req.body.ready_for_transfer + "' , '" + req.body.notes + "');" );
      // connection.query("INSERT INTO koalas ( name, age, sex, ready_for_transfer, notes ) VALUES ( '" + req.body.name + "' , " + req.body.age + " , '" + req.body.sex + "' , '" + req.body.ready_for_transfer + "' , '" + req.body.notes + "');" );

      // connection using parameterization
      connection.query("INSERT INTO koalas (name, age, sex, ready_for_transfer, notes) VALUES ($1, $2, $3, $4, $5)", [req.body.name, req.body.age, req.body.sex, req.body.ready_for_transfer, req.body.notes]);
      done();
      res.sendStatus(200);
    } // end no error
  }); // end pool.connect
}); // end /addKoala POST
