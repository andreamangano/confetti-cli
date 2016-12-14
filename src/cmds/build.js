'use strict';
import shell from 'shelljs';
import chalk from 'chalk';
import config from './../config';
const errorStyle = chalk.bold.red;
// Build Command
//--------------
exports.command = 'build';
exports.desc = 'Build all assets for the speaker deck.';
exports.handler = argv => {
  shell.cd(config.STARTER_REPOSITORY_NAME);
  if (shell.exec('npm run build').code !== 0) {
    console.error(errorStyle('Error: Build failed.'));
    shell.exit(1);
  }
};
