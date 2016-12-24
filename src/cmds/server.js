'use strict';
import shell from 'shelljs';
import bs from 'browser-sync';
import config from '../config.js';
import * as logger from './../logger';
//--------------
// Serve Command
//--------------
exports.command = 'server';
exports.desc = `Serve the ${config.DIST_FOLDER} folder`;
exports.handler = argv => {
  if (shell.exec('confetti generate').code === 0) {
    logger.success('All done! Enjoy Confetti!', 0x1F389);
    logger.message('Serving the dist folder...');
    bs.create('Confetti Server');
    bs.init({
      server: config.DIST_FOLDER
    });
    bs.watch(config.DIST_FOLDER).on('change', bs.reload);
  } else {
    logger.error(`Error occurs during the building process.`);
    shell.exit(1);
  }
};

