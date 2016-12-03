'use strict';
// Install Command
//----------------
exports.command = 'install <name>';
exports.desc = 'Install theme named <name>';
exports.builder = {};
exports.handler = argv => {
  console.log('Installing theme %s', argv.name);
};
