'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chalk = require('chalk');
var noticeStyle = chalk.bold.yellow;
// Serve Command
//--------------
exports.command = 'server';
exports.desc = 'Serve the ./build folder';
exports.handler = function (argv) {
  _shelljs2.default.cd(_config2.default.STARTER_FOLDER);
  _shelljs2.default.cd(_config2.default.STARTER_REPOSITORY_NAME);
  console.log(noticeStyle('Serve the build folder...'));
  _shelljs2.default.exec('npm run serve');
};