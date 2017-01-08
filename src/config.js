'use strict';
const THEME_PREFIX = 'confetti-theme-';
// List of official themes
const official_themes = {
  voice: {
    name: 'voice',
    repository: `https://github.com/andreamangano/${THEME_PREFIX}voice.git`
  },
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
  DEV_FOLDER: './dev',
  THEME_PREFIX,
  DEFAULT_THEME: official_themes.voice,
  OFFICIAL_THEMES: official_themes
};
