'use strict';
import shell from 'shelljs';
import isThere from 'is-there';
import emptyDir from 'empty-dir';
import chalk from 'chalk';
import config from './../config';
const errorStyle = chalk.bold.red;
const noticeStyle = chalk.bold.gray;
/*
 Method for cloning the starter repository
 and installing its npm dependencies
 */
const cloneStarter = settings => {
  // Create starter folder
  console.log(noticeStyle(`Create folder ${settings.STARTER_FOLDER}...`));
  shell.mkdir('-p', config.STARTER_FOLDER);
  shell.cd(config.STARTER_FOLDER);
  // Clone the confetti-starter repository
  console.log(noticeStyle(`Clone confetti-starter repository into ${settings.STARTER_FOLDER}...`));
  shell.exec(`git clone ${settings.STARTER_REPOSITORY}`);
  shell.cd(settings.STARTER_REPOSITORY_NAME);
  // Install repository dependencies
  console.log(noticeStyle('Install repository dependencies...'));
  console.log(noticeStyle('It might take several minutes...'));
  shell.exec('npm install');
};
/*
 Method for cloning the default theme
 and installing its npm dependencies
 */
const cloneDefaultTheme = settings => {
  // Install default theme
  shell.cd(settings.THEMES_FOLDER);
  shell.exec(`git clone ${settings.DEFAULT_THEME.repository}`);
  // Install theme dependencies
  console.log(noticeStyle('Install theme dependencies...'));
  console.log(noticeStyle('It might take several minutes...'));
  shell.cd(settings.THEME_PREFIX + settings.DEFAULT_THEME.name);
  shell.exec('npm install');
};
// Init Command
//-------------
exports.command = 'init';
exports.desc = 'Initialize the speaker deck folder';
exports.handler = argv => {
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
        console.log(errorStyle(`Directory already exists and it's not empty. 
        Change the ${config.STARTER_FOLDER} name or remove it.`));
      }
    });
  } else {
    // The folder doesn't exists. Start to clone.
    cloneStarter(config.STARTER_FOLDER);
  }
};
