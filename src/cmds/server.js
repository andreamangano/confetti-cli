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
import del from 'del';
const loader = new Loader();
/*
 Function to load data and to build the slide deck.
 */
const build = (bs, dev, cb) => {
  logger.message('Loading speaker deck data...');
  loader.loadDeck(configLoader)
    .then(deckData => {
      // Generator set to false (We are in development environment)
      const generator = new Generator(deckData.paths, false);
      logger.success('Speaker deck data loaded.');
      logger.message('Generating speaker deck...');
      generator.generate(deckData)
        .then(() => {
          cb(generator, deckData, bs, dev);
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
/*
 Function called after the slide deck is built.
 */
const callback = (generator, deckData, bs, dev) => {
  // Don't call init method if the bs is active yet.
  if (!bs.active) {
    bs.create();
    bs.init({server: config.DIST_FOLDER});
  }
  /*
   Watch changes on:
   - slide deck settings
   - data slides
   - selected theme config
   */
  bs.watch([
    configLoader.paths.settings,
    configLoader.paths.slides,
    path.join(configLoader.paths.themes, deckData.theme, 'data.yml')
  ]).on('change', () => {
    // If anything is changed rebuild the deck
    build(bs, dev, callback);
  });
  bs.watch(configLoader.paths.covers).on('change', () => generator.copyCovers());
  bs.watch(config.DIST_FOLDER).on('change', bs.reload);
  /*
    Watch the theme assets only if the dev mode is switched on.
  */
  if (dev) {
    logger.info('Theme development environment enabled.');
    watchAll(bs, generator, deckData);
  }
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
  del(config.DIST_FOLDER)
    .then(() => {
      build(bs, argv.dev, callback);
    })
    .catch(error => {
      logger.error(error);
      shell.exit(1);
    });
};
