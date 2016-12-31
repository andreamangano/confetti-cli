'use strict';
export default {
  paths: {
    settings: './settings.yml',
    slides: './data/slides.md',
    images: './data/images/',
    themes: './themes',
    dist: './dist'
  },
  compilers: {
    sass: {
      includePaths: ['./node_modules/']
    }
  }
};
