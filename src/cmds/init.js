'use strict';

const shell = require("shelljs");
const STARTER_REPOSITORY = 'https://github.com/andreamangano/confetti-starter.git';
const IsThere = require( "is-there" );
const emptyDir = require( 'empty-dir' );
const chalk = require( 'chalk' );

var errorStyle = chalk.bold.red;
var successStyle = chalk.bold.green;

var cloneStarter = function ( folder ) {
  console.log( successStyle( "Create folder " + folder + '...' ) );
  shell.mkdir('-p', folder);
  shell.cd(folder);
  console.log( successStyle( "Clone confetti-starter repository into "+ folder + "..." ) );
  shell.exec("git clone " + STARTER_REPOSITORY);
  shell.cd('./confetti-starter');
  console.log( successStyle( "Install repository dependencies..." ) );
  shell.exec("npm install");
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