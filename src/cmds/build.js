'use strict';
import shell from 'shelljs';
import config from '../config.js';
import configLoader from './../config-loader';
import Generator from 'confetti-generator';
import Loader from 'confetti-loader';
import * as logger from './../logger';
const loader = new Loader();
//--------------
// Serve Command
//--------------
exports.command = 'build';
exports.desc = `Build the dist folder (${config.DIST_FOLDER})`;
exports.handler = argv => {
  // Don't remove the dist folder before because it could be versioned.
  logger.message('Loading speaker deck data...');
  loader.loadDeck(configLoader, true)
    .then(deckData => {
      const generator = new Generator(deckData.paths, true);
      logger.success('Speaker deck data loaded.');
      logger.message('Generating speaker deck for build...');
      generator.generate(deckData)
        .then(() => {
          logger.success('Build done! The dist folder has been generated.');
        })
        .catch(error => {
          logger.error(error);
          shell.exit(1);
        });
    })
    .catch(error => {
      logger.error(error);
      shell.exit(1);
    });
};
