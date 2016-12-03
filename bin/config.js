'use strict';

var theme_prefix = 'confetti-theme-';
// List of official themes
var official_themes = {
  lena: {
    name: 'lena',
    repository: 'https://github.com/andreamangano/' + theme_prefix + 'lena.git'
  },
  tangerine: {
    name: 'tangerine',
    repository: 'https://github.com/andreamangano/' + theme_prefix + 'tangerine.git'
  }
};
module.exports = {
  STARTER_REPOSITORY: 'https://github.com/andreamangano/confetti-starter.git',
  STARTER_REPOSITORY_NAME: 'confetti-starter',
  STARTER_FOLDER: './desk',
  THEMES_FOLDER: 'src/themes',
  THEME_PREFIX: theme_prefix,
  DEFAULT_THEME: official_themes.lena,
  OFFICIAL_THEMES: official_themes
};