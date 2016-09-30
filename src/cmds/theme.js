'use strict';

exports.command = 'theme <command>';

exports.desc = 'Manage set of themes';

exports.builder = function (yargs) {
  return yargs.commandDir('theme_cmds')
};

exports.handler = function (argv) {};