'use strict';

const cwd = require('cwd');
const path = require('path');
//const pkg = require(path.join(cwd(), 'package.json'));

// Serve Command
//--------------
exports.command = 'serve';

exports.desc = 'Serve the ./build folder';

exports.handler = function ( argv ) {
  //console.log('Serving the build folder.')
};