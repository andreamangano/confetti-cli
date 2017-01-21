'use strict';
import shell from 'shelljs';
import config from '../config.js';
import configLoader from './../config-loader';
import Loader from 'confetti-loader';
import EventEmitter from './../eventEmitter';
import BuildObserver from './../buildObserver';
import * as logger from './../logger';
import path from 'path';
import del from 'del';
import bs from 'browser-sync';
bs.create('server');
const loader = new Loader();

const serve = (argv, serveFolder) => {
  const observable = new EventEmitter();
  const serveDist = Boolean(argv.dist);
  const builObserver = new BuildObserver(1, observable);
  const watchersCommonOptions = {
    ignored: ignoredPath => {
      // Ignores .dotfiles
      // Chokidar does match against the whole path and not just
      // filename itself.
      return /(^[.#]|(?:__|~)$)/.test(path.basename(ignoredPath));
    },
    ignoreInitial: true
  };
  loader.loadDeck(configLoader, serveDist)
    .then(deckData => {
      const bsInstance = bs.get('server');
      bsInstance.init({
        server: serveFolder,
        open: false,
        logPrefix: 'Confetti'
      });
      bsInstance.emitter.on('init', () => {
        observable.emit('serverInit', {deck: deckData, serveDist});
      });
      /*
       Watch the settings files:
       - deck settings
       - slides data
       - theme config
       */
      bsInstance.watch([
        configLoader.paths.settings,
        configLoader.paths.slides,
        path.join(configLoader.paths.themes, deckData.theme, 'data.yml')
      ], watchersCommonOptions).on('change', path => {
        observable.emit(
          'settingsChange',
          {path, serveDist, cb: () => bsInstance.reload()});
      });
      /*
       Watch the folder where the covers are.
       */
      bsInstance.watch(
        path.join(configLoader.paths.covers, '**', '*.{svg,png,jpg,jpeg,gif}'),
        watchersCommonOptions)
          .on('all', (event, path) => {
            observable.emit(
              'onDeckImagesChange',
              {event, path, cb: () => bsInstance.reload()});
          });

      if (argv.dev) {
        logger.info('Theme development mode enabled.');

        /*
          Watchers for styles
          */
        bsInstance.watch(
          deckData.paths.sources.styles,
          watchersCommonOptions)
            .on('all', (event, path) => {
              observable.emit(
                'stylesChange',
                {event, path, cb: () => bsInstance.reload()});
            });

        /*
          Watchers for theme views
          */
        bsInstance.watch(
          deckData.paths.sources.views,
          watchersCommonOptions)
            .on('all', (event, path) => {
              observable.emit(
                'viewsChange',
                {event, path, cb: () => bsInstance.reload()});
            });

        /*
          Watchers for theme javascript files
          */
        bsInstance.watch(
          path.join(deckData.paths.sources.javascript, '**', '*.js'),
          watchersCommonOptions)
            .on('all', (event, path) => {
              observable.emit(
                'javascriptChange',
                {event, path, cb: () => bsInstance.reload()});
            });

        /*
          Watchers for user images
          */
        bsInstance.watch(
          path.join(deckData.paths.sources.images, '**', '*.{svg,png,jpg,jpeg,gif}'),
          watchersCommonOptions)
            .on('all', (event, path) => {
              observable.emit(
                'imagesChange',
                {event, path, cb: () => bsInstance.reload()});
            });

        /*
          Watchers for theme fonts
        */
        bsInstance.watch(
          path.join(deckData.paths.sources.fonts, '**', '*.{eot,ttf,otf,woff,svg}'),
          watchersCommonOptions)
            .on('all', (event, path) => {
              observable.emit(
                'fontsChange',
                {event, path, cb: () => bsInstance.reload()});
            });
      }
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
  // Delete all files (not structure folder) excepted hidden files (e.g. .git)
  // It is useful when you are going to version your dist folder
  del(`${SERVE_FOLDER}/**/*.*`)
    .then(() => {
      serve(argv, SERVE_FOLDER);
    })
    .catch(error => {
      logger.error(error);
      shell.exit(1);
    });
};
