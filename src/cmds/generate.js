'use strict';
import shell from 'shelljs';
import chalk from 'chalk';
import configLoader from './../config-loader';
import config from './../config';
import Generator from 'confetti-generator';
import Loader from 'confetti-loader';
const errorStyle = chalk.bold.red;
const successStyle = chalk.bold.green;
// Generate Command
//--------------
exports.command = 'generate';
exports.desc = 'Generate all assets for the speaker deck.';
exports.handler = argv => {
  const loader = new Loader();
  loader.loadDeck(configLoader)
    .then(deckData => {
      const generator = new Generator(deckData.paths, true);
      generator.generate(deckData)
        .then(() => {
          console.log(successStyle('Speaker Deck built.'));
        })
        .catch(error => {
          console.log(errorStyle(error));
        });
    })
    .catch(error => {
      console.log(errorStyle(error));
    });

  // TODO: clear dist folder before
  // if (shell.exec('confetti-loader --config confetti.loader.json |
  // confetti-generator').code !== 0) {
  //  console.error(errorStyle('Error: Generation failed.'));
  //  shell.exit(1);
  // }
};
