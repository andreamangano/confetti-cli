'use strict';
import shell from 'shelljs';
import config from '../config.js';
const chalk = require('chalk');
const noticeStyle = chalk.bold.yellow;
// Serve Command
//--------------
exports.command = 'server';
exports.desc = 'Serve the ./build folder';
exports.handler = argv => {
  shell.cd(config.STARTER_FOLDER);
  shell.cd(config.STARTER_REPOSITORY_NAME);
  console.log(noticeStyle('Serve the build folder...'));
  shell.exec('npm run serve');
};
