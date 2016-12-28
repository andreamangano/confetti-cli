'use strict';
import shell from 'shelljs';
import bs from 'browser-sync';
import config from '../config.js';
import configLoader from './../config-loader';
import Generator from 'confetti-generator';
import Loader from 'confetti-loader';
import watchAll from './../assets-watchers';
import * as logger from './../logger';
import path from 'path';
const loader = new Loader();
const build = (cb, firstTime) => {
  logger.message('Loading speaker deck data...');
  loader.loadDeck(configLoader)
    .then(deckData => {
      // Generator set to false (We are in development environment)
      const generator = new Generator(deckData.paths, false);
      logger.success('Speaker deck data loaded.');
      logger.message('Generating speaker deck...');
      generator.generate(deckData)
        .then(() => {
          cb(generator, deckData, firstTime);
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
//--------------
// Serve Command
//--------------
exports.command = 'server';
exports.builder = {
  dev: {
    describe: `Enables watching and reload the browser when theme assets changes.`,
    requiresArg: false
  }
};
exports.desc = `Serve the ${config.DIST_FOLDER} folder`;
exports.handler = argv => {
  if (shell.exec(`rm -rf ${config.DIST_FOLDER}`).code !== 0) {
    logger.error(`Error cleaning dist folder.`);
    shell.exit(1);
  }
  bs.create();
  const callback = (generator, deckData, firstTime) => {
    if (firstTime) {
      bs.init({
        server: config.DIST_FOLDER
      });
    }
    bs.watch([
      configLoader.paths.settings,
      configLoader.paths.images,
      configLoader.paths.slides,
      path.join(configLoader.paths.themes, deckData.theme, 'data.yml')
    ]).on('change', () => {
      build(callback, false);
    });
    if (argv.dev) {
      logger.info('Theme development environment enabled.');
      watchAll(bs, generator, deckData);
    }
    bs.watch(config.DIST_FOLDER).on('change', bs.reload);
  };
  build(callback, true);
};
