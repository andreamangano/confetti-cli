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
const build = (bs, dev, folder, serveDist) => {
  logger.message('Loading speaker deck data...');
  loader.loadDeck(configLoader, serveDist)
    .then(deckData => {
      const generator = new Generator(deckData.paths, serveDist);
      logger.success('Speaker deck data loaded.');
      logger.message('Generating speaker deck...');
      generator.generate(deckData)
        .then(() => {
          if (!bs.active) {
            bs.create();
            bs.init({server: folder, open: false});
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
              build(bs, dev, folder, serveDist);
            });
            bs.watch(configLoader.paths.covers).on('change',
              () => generator.copyCovers().catch(error => logger.error(error)));
            bs.watch(folder).on('change', bs.reload);
            /*
             Watch the theme assets only if the dev mode is switched on.
             */
            if (dev) {
              logger.info('Theme development environment enabled.');
              watchAll(bs, generator, deckData);
            }
          }
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
  },
  dist: {
    describe: `Serve the dist folder (${config.DIST_FOLDER}).`,
    requiresArg: false
  }
};
exports.desc = `Serve the compiled deck folder`;
exports.handler = argv => {
  const SERVE_FOLDER = argv.dist ? config.DIST_FOLDER : config.DEV_FOLDER;
  del(SERVE_FOLDER)
    .then(() => {
      const serveDist = Boolean(argv.dist);
      build(bs, argv.dev, SERVE_FOLDER, serveDist);
    })
    .catch(error => {
      logger.error(error);
      shell.exit(1);
    });
};
