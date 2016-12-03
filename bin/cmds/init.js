'use strict';

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _isThere = require('is-there');

var _isThere2 = _interopRequireDefault(_isThere);

var _emptyDir = require('empty-dir');

var _emptyDir2 = _interopRequireDefault(_emptyDir);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _config = require('./../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorStyle = _chalk2.default.bold.red;
var noticeStyle = _chalk2.default.bold.gray;
var cloneStarter = function cloneStarter() {
  // Create starter folder
  console.log(noticeStyle('Create folder ' + _config2.default.STARTER_FOLDER + '...'));
  _shelljs2.default.mkdir('-p', _config2.default.STARTER_FOLDER);
  _shelljs2.default.cd(_config2.default.STARTER_FOLDER);
  // Clone the confetti-starter repository
  console.log(noticeStyle('Clone confetti-starter repository into ' + _config2.default.STARTER_FOLDER + '...'));
  _shelljs2.default.exec('git clone ' + _config2.default.STARTER_REPOSITORY);
  _shelljs2.default.cd(_config2.default.STARTER_REPOSITORY_NAME);
  // Install repository dependencies
  console.log(noticeStyle('Install repository dependencies...'));
  console.log(noticeStyle('It might take several minutes...'));
  _shelljs2.default.exec('npm install');
  // Install default theme
  _shelljs2.default.cd(_config2.default.THEMES_FOLDER);
  _shelljs2.default.exec('git clone ' + _config2.default.DEFAULT_THEME.repository);
  // Install theme dependencies
  console.log(noticeStyle('Install theme dependencies...'));
  console.log(noticeStyle('It might take several minutes...'));
  _shelljs2.default.cd(_config2.default.THEME_PREFIX + _config2.default.DEFAULT_THEME.name);
  _shelljs2.default.exec('npm install');
};
// Init Command
//-------------
exports.command = 'init [dir]';
exports.desc = 'Initialize the speaker deck folder';
exports.handler = function (argv) {
  var folderExists = (0, _isThere2.default)(_config2.default.STARTER_FOLDER);
  // Check if the folder exists.
  if (folderExists) {
    // Check if the folder is empty
    (0, _emptyDir2.default)(_config2.default.STARTER_FOLDER, function (err, result) {
      if (err) {
        console.error(errorStyle(err));
      } else if (result) {
        cloneStarter(_config2.default.STARTER_FOLDER);
      } else {
        // Folder is not empty
        console.log(errorStyle('Directory already exists and it\'s not empty. Change the ' + _config2.default.STARTER_FOLDER + ' name or remove it.'));
      }
    });
  } else {
    // The folder doesn't exists
    cloneStarter(_config2.default.STARTER_FOLDER);
  }
};