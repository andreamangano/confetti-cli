'use strict';
import config from './config';
export default {
  paths: {
    settings: './settings.yml',
    slides: './data/slides.md',
    covers: './data/images/',
    themes: './themes',
    dev: config.DEV_FOLDER,
    dist: config.DIST_FOLDER
  },
  compilers: {
    sass: {
      includePaths: ['./node_modules/']
    }
  }
};
