'use strict';

const shell = require("shelljs");
const cwd = require('cwd');
const path = require('path');
//const pkg = require(path.join(cwd(), 'package.json'));

const chalk = require( 'chalk' );

var noticeStyle = chalk.bold.yellow;

// Serve Command
//--------------
exports.command = 'server';

exports.desc = 'Serve the ./build folder';

exports.handler = function ( argv ) {
  console.log(noticeStyle('Serve the build folder...'));
  shell.exec('npm run serve');
};