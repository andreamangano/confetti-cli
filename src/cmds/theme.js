'use strict';
exports.command = 'theme <command>';
exports.desc = 'Manage set of themes';
exports.builder = yargs => {
  return yargs.commandDir('theme_cmds');
};
exports.handler = argv => {};
