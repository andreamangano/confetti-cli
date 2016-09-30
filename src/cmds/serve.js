'use strict';

// Serve Command
//--------------
exports.command = 'serve';

exports.desc = 'Serve the ./build folder';

exports.handler = function ( argv ) {
  console.log('Serving the build folder.')
};