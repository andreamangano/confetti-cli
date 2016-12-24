'use strict';
import * as logger from './../logger';
import configLoader from './../config-loader';
import Generator from 'confetti-generator';
import Loader from 'confetti-loader';
import shell from 'shelljs';
import config from '../config.js';
//-----------------
// Generate Command
//-----------------
exports.command = 'generate';
exports.desc = 'Generate all assets for the speaker deck.';
exports.handler = argv => {
  if (shell.exec(`rm -rf ${config.DIST_FOLDER}`).code !== 0) {
    console.error(`Error cleaning dist folder.`);
    shell.exit(1);
  }
  const loader = new Loader();
  logger.message('Loading speaker deck data...');
  loader.loadDeck(configLoader)
    .then(deckData => {
      const generator = new Generator(deckData.paths, true);
      logger.success('Speaker deck data loaded.');
      logger.message('Generating speaker deck...');
      generator.generate(deckData)
        .then(() => {
          logger.success('Speaker deck built.');
        })
        .catch(error => {
          logger.error(error);
        });
    })
    .catch(error => {
      logger.error(error);
    });
};
