'use strict';
require('shelljs/global');
import shell from 'shelljs';
import isThere from 'is-there';
import emptyDir from 'empty-dir';
import chalk from 'chalk';
import config from './../config';
const errorStyle = chalk.bold.red;
const noticeStyle = chalk.bold.gray;
const successStyle = chalk.bold.green;
const installDependencies = subject => {
  if (shell.exec('npm install').code !== 0) {
    console.error(errorStyle('Error occurs during the dependencies'
      + ' installation.'));
    shell.exit(1);
  }
  console.log(successStyle(`${subject} dependencies installed.`));
};
/*
 Method for cloning the starter repository
 and installing its npm dependencies
 */
const cloneStarter = config => {
  shell.cd(config.STARTER_FOLDER);
  // Clone the confetti-starter repository
  console.log(noticeStyle(`Clone confetti-starter repository into ${config.STARTER_FOLDER}...`));
  if (shell.exec(`git clone ${config.STARTER_REPOSITORY}`).code !== 0) {
    console.error(errorStyle(`Error: Cloning repository ${config.STARTER_REPOSITORY} failed`));
    shell.exit(1);
  }
  console.log(successStyle(`${config.STARTER_REPOSITORY} repository cloned.`));
  shell.cd(config.STARTER_REPOSITORY_NAME);
  // Install repository dependencies
  console.log(noticeStyle('Install repository dependencies...'));
  console.log(noticeStyle('It might take several minutes...'));
  installDependencies('Starter');
};
/*
 Method for cloning the default theme
 and installing its npm dependencies
 */
const cloneDefaultTheme = config => {
  // Install default theme
  shell.cd(config.THEMES_FOLDER);
  // Clone theme repository
  if (shell.exec(`git clone ${config.DEFAULT_THEME.repository}`).code !== 0) {
    console.error(errorStyle(`Error: Cloning repository ${config.DEFAULT_THEME.repository} failed`));
    shell.exit(1);
  }
  console.log(successStyle(`${config.DEFAULT_THEME.repository} theme repository cloned.`));
  // Install theme dependencies
  console.log(noticeStyle('Install theme dependencies...'));
  console.log(noticeStyle('It might take several minutes...'));
  shell.cd(config.THEME_PREFIX + config.DEFAULT_THEME.name);
  installDependencies('Theme');
};
// Init Command
//-------------
exports.command = 'init';
exports.desc = 'Initialize the speaker deck folder';
exports.handler = argv => {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  // Check if the folder exists.
  if (isThere(config.STARTER_FOLDER)) {
    // Check if the folder is empty
    emptyDir(config.STARTER_FOLDER, (err, result) => {
      if (err) {
        console.error(errorStyle(err));
      } else if (result) {
        cloneStarter(config);
        cloneDefaultTheme(config);
      } else {
        // Folder is not empty
        console.error(errorStyle(`Folder already exists and it's not empty. 
        Change the '${config.STARTER_FOLDER}' folder name or remove it.`));
      }
    });
  } else {
    // The folder doesn't exists. Make it
    console.log(noticeStyle(`Create folder ${config.STARTER_FOLDER}...`));
    shell.mkdir('-p', config.STARTER_FOLDER);
    // Start to clone.
    cloneStarter(config);
    cloneDefaultTheme(config);
  }
};
