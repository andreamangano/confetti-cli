'use strict';
import shell from 'shelljs';
import bs from 'browser-sync';
import config from '../config.js';
const chalk = require('chalk');
const noticeStyle = chalk.bold.yellow;
// Serve Command
//--------------
exports.command = 'server';
exports.desc = `Serve the ${config.DIST_FOLDER} folder`;
exports.handler = argv => {
  console.log(noticeStyle('Serve the dist folder...'));
  bs.create('Confetti Server');
  bs.init({
    server: config.DIST_FOLDER
  });
  bs.watch(config.DIST_FOLDER).on('change', bs.reload);
};
