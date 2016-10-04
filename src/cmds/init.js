'use strict';

const shell = require( "shelljs" );
const IsThere = require( "is-there" );
const emptyDir = require( 'empty-dir' );
const chalk = require( 'chalk' );
const config = require( '../config.js' );

var errorStyle = chalk.bold.red;
var noticeStyle = chalk.bold.gray;

var cloneStarter = function () {

  // Create starter folder
  console.log( noticeStyle( "Create folder " + config.STARTER_FOLDER + '...' ) );
  shell.mkdir( '-p', config.STARTER_FOLDER );
  shell.cd( config.STARTER_FOLDER );

  // Clone the confetti-starter repository
  console.log( noticeStyle( "Clone confetti-starter repository into " + config.STARTER_FOLDER + "..." ) );
  shell.exec( "git clone " + config.STARTER_REPOSITORY );
  shell.cd( config.STARTER_REPOSITORY_NAME );

  // Install repository dependencies
  console.log( noticeStyle( "Install repository dependencies..." ) );
  console.log( noticeStyle( "It might take several minutes..." ) );
  shell.exec( "npm install" );

  // Install default theme
  shell.cd(config.THEMES_FOLDER);
  shell.exec( "git clone " + config.DEFAULT_THEME.repository );

  // Install theme dependencies
  console.log( noticeStyle( "Install theme dependencies..." ) );
  console.log( noticeStyle( "It might take several minutes..." ) );
  shell.cd(config.THEME_PREFIX + config.DEFAULT_THEME.name);
  shell.exec( "npm install" );
};

// Init Command
//-------------
exports.command = 'init [dir]';

exports.desc = 'Initialize the speaker deck folder';

exports.handler = function ( argv ) {

  var folderExists = IsThere( config.STARTER_FOLDER );

  // Check if the folder exists.
  if ( folderExists ) {

    // Check if the folder is empty
    emptyDir( config.STARTER_FOLDER, function ( err, result ) {

      if ( err ) {
        console.error( errorStyle( err ) );
      } else {
        // Folder is empty
        if ( result ) {
          cloneStarter( config.STARTER_FOLDER );
        } else { // Folder is not empty
          console.log( errorStyle( 'Directory already exists and it\'s not empty. Change the ${config.STARTER_FOLDER} name or remove it.' ) );
        }
      }
    } );
  } else { // The folder doesn't exists
    cloneStarter( config.STARTER_FOLDER );
  }
};