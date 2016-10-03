'use strict';

const shell = require("shelljs");
const cwd = require('cwd');
const path = require('path');
const config = require('../config.js');

//const pkg = require(path.join(cwd(), 'package.json'));

const chalk = require( 'chalk' );

const STARTER_FOLDER = config.STARTER_FOLDER;
const STARTER_REPOSITORY_NAME = config.STARTER_REPOSITORY_NAME;

var noticeStyle = chalk.bold.yellow;

// Serve Command
//--------------
exports.command = 'server';

exports.desc = 'Serve the ./build folder';

exports.handler = function ( argv ) {
  shell.cd(STARTER_FOLDER);
  shell.cd(STARTER_REPOSITORY_NAME);
  console.log(noticeStyle('Serve the build folder...'));
  shell.exec('npm run serve');
};