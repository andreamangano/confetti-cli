'use strict';
import path from 'path';
const THEME_PREFIX = 'confetti-theme-';
// List of official themes
const official_themes = {
  lena: {
    name: 'lena',
    repository: `https://github.com/andreamangano/${THEME_PREFIX}lena.git`
  },
  tangerine: {
    name: 'tangerine',
    repository: `https://github.com/andreamangano/${THEME_PREFIX}tangerine.git`
  }
};
const baseDir = './deck';
export default {
  STARTER_REPOSITORY: 'https://github.com/andreamangano/confetti-starter.git',
  STARTER_FOLDER: baseDir,
  THEMES_FOLDER: `./themes`,
  DIST_FOLDER: './dist',
  THEME_PREFIX,
  DEFAULT_THEME: official_themes.tangerine,
  OFFICIAL_THEMES: official_themes
};
