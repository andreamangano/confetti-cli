'use strict';

const shell = require("shelljs");
const IsThere = require( "is-there" );
const emptyDir = require( 'empty-dir' );
const chalk = require( 'chalk' );
const config = require('../config.js');

var errorStyle = chalk.bold.red;
var noticeStyle = chalk.bold.gray;

const STARTER_REPOSITORY = config.STARTER_REPOSITORY;
const STARTER_REPOSITORY_NAME = config.STARTER_REPOSITORY_NAME;
const STARTER_FOLDER = config.STARTER_FOLDER;


var cloneStarter = function () {
  console.log( noticeStyle( "Create folder " + STARTER_FOLDER + '...' ) );
  shell.mkdir('-p', STARTER_FOLDER);
  shell.cd(STARTER_FOLDER);
  console.log( noticeStyle( "Clone confetti-starter repository into "+ STARTER_FOLDER + "..." ) );
  shell.exec("git clone " + STARTER_REPOSITORY);
  shell.cd(STARTER_REPOSITORY_NAME);
  console.log( noticeStyle( "Install repository dependencies..." ) );
  console.log( noticeStyle( "It might take several minutes..." ) );
  shell.exec("npm install");
};

// Init Command
//-------------
exports.command = 'init [dir]';

exports.desc = 'Initialize the speaker deck folder';

exports.handler = function ( argv ) {

  var folderExists = IsThere( STARTER_FOLDER );

  // Check if the folder exists.
  if ( folderExists ) {

    // Check if the folder is empty
    emptyDir( STARTER_FOLDER, function ( err, result ) {

      if ( err ) {
        console.error( errorStyle( err ) );
      } else {
        // Folder is empty
        if ( result ) {
          cloneStarter( STARTER_FOLDER );
        } else { // Folder is not empty
          console.log( errorStyle( 'Directory already exists and it\'s not empty. Change the ${STARTER_FOLDER} name or remove it.' ) );
        }
      }
    } );
  } else { // The folder doesn't exists
    cloneStarter( STARTER_FOLDER );
  }
};