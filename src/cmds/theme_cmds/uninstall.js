'use strict';

// Install Command
//----------------
exports.command = 'uninstall <name>';

exports.desc = 'Uninstall theme named <name>';

exports.builder = {};

exports.handler = function (argv) {
  console.log('Uninstalling theme %s', argv.name)
};