'use strict';
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
export default {
  STARTER_REPOSITORY: 'https://github.com/andreamangano/confetti-starter.git',
  STARTER_REPOSITORY_NAME: 'confetti-starter',
  STARTER_FOLDER: './deck',
  THEMES_FOLDER: './src/themes',
  THEME_PREFIX,
  DEFAULT_THEME: official_themes.tangerine,
  OFFICIAL_THEMES: official_themes
};
