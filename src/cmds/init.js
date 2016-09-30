'use strict';

const nodegit = require( 'nodegit' );
const STARTER_REPOSITORY = 'https://github.com/andreamangano/confetti-starter.git';
// const pkg = require( '../package.json' );
const path = require( 'path' );
const IsThere = require( "is-there" );
const emptyDir = require( 'empty-dir' );
const chalk = require( 'chalk' );

var errorStyle = chalk.bold.red;
var successStyle = chalk.bold.green;


var cloneStarter = function ( folder ) {
  nodegit.Clone( STARTER_REPOSITORY, folder, {} ).then( function ( repo ) {
    console.log( successStyle( "Cloned " + path.basename( STARTER_REPOSITORY ) + " to " + repo.workdir() ) );
  } ).catch( function ( err ) {
    console.log( errorStyle( err ) );
  } );
};

// Init Command
//-------------
exports.command = 'init [dir]';

exports.desc = 'Initialize the speaker deck folder';

exports.builder = {
  dir: {
    default: './desk'
  }
};

exports.handler = function ( argv ) {

  var folder = argv.dir;
  var folderExists = IsThere( folder );

  // Check if the folder exists.
  if ( folderExists ) {

    // Check if the folder is empty
    emptyDir( folder, function ( err, result ) {

      if ( err ) {
        console.error( errorStyle( err ) );
      } else {
        // Folder is empty
        if ( result ) {
          cloneStarter( folder );
        } else { // Folder is not empty
          console.log( errorStyle( 'Directory already exists and it\'s not empty. Change the <folder> name or remove it.' ) );
        }
      }
    } );
  } else { // The folder doesn't exists
    cloneStarter( folder );
  }
};