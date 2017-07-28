// requires
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 6789;
const pg = require('pg');
const Sequelize = require('sequelize');

const pool = new pg.Pool( config );

// setting up a sequelize connection
const sequelize = new Sequelize('koalaHolla', 'matthewlarson', 'wisconsin3', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
});

// testing the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// set up config for the pool
// const config = {
//   database: 'koalaHolla',
//   host: 'localhost',
//   port: 5432,
//   max: 10
// };

// new pool using config ^
// const pool = new pg.Pool( config );

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


const koalasArray = [];

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
      const resultSet = connection.query( "SELECT * FROM koalas" );
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

app.post('/editKoala', function( req, res ) {
  pool.connect(function( err, connection, done ){
    if (err){
      console.log(err);
      res.sendStatus( 400 );
    }
    else{
      console.log('connect to DB for edit');
      // connection using parameterization
      connection.query("UPDATE koalas SET name=$1, age=$2, sex=$3, ready_for_transfer=$4, notes=$5 WHERE name=$1" , [req.body.name, req.body.age, req.body.sex, req.body.ready_for_transfer, req.body.notes]);
      done();
      res.sendStatus(200);
    } // end no error
  }); // end pool.connect
}); // end /editKoala POST

app.post( '/deleteKoala', function( req, res ) {
  pool.connect(function( err, connection, done ){
    if ( err ){
      console.log( err );
      res.sendStatus( 400 );
    }
    else{
      console.log( 'connect to DB for delete' );
      // connection using parameterization
      connection.query( "DELETE FROM koalas WHERE name=$1" , [req.body.selectedDropdown] );
      done();
      res.sendStatus( 200 );
    } // end no error
  }); // end pool.connect
}); // end /deleteKoala POST
