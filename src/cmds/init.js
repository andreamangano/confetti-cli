'use strict';
import shell from 'shelljs';
import isThere from 'is-there';
import emptyDir from 'empty-dir';
import config from './../config';
import * as logger from './../logger';
import path from 'path';
/*
  Method for installing package dependencies.
*/
const installDependencies = subject => {
  if (shell.exec('npm install').code !== 0) {
    logger.error(`Error occurs during the dependencies installation.`);
    shell.exit(1);
  }
  logger.success(`${subject} dependencies installed.`);
};
/*
 Method for cloning the starter repository
 and installing its npm dependencies
 */
const cloneStarter = config => {
  if (shell.exec(`git clone ${config.STARTER_REPOSITORY} ${config.STARTER_FOLDER}`).code !== 0) {
    logger.error(`Error: Cloning repository ${config.STARTER_REPOSITORY} failed`);
    shell.exit(1);
  }
  logger.success(`${config.STARTER_REPOSITORY} repository cloned.`);
  // Install repository dependencies
  logger.message('Install repository dependencies...');
  logger.message('It might take several minutes...');
  shell.cd(config.STARTER_FOLDER);
  installDependencies('Starter');
};
/*
 Method for cloning the default theme
 and installing its npm dependencies
 */
const cloneDefaultTheme = config => {
  const themePath = path.join(config.THEMES_FOLDER, config.DEFAULT_THEME.name);
  // Clone theme repository
  if (shell.exec(`git clone ${config.DEFAULT_THEME.repository} ${themePath}`).code !== 0) {
    logger.error(`Error: Cloning repository ${config.DEFAULT_THEME.repository} failed`);
    shell.exit(1);
  }
  logger.success(`${config.DEFAULT_THEME.repository} theme repository cloned.`);
  // Install theme dependencies
  logger.message('Install theme dependencies...');
  logger.message('It might take several minutes...');
  shell.cd(themePath);
  installDependencies('Theme');
};
// Init Command
//-------------
exports.command = 'init';
exports.desc = 'Create a new slide deck folder at the the current directory.';
exports.handler = argv => {
  if (!shell.which('git')) {
    logger.error('Sorry, this script requires git!');
    shell.exit(1);
  }
  // Check if the folder exists.
  if (isThere(config.STARTER_FOLDER)) {
    // Check if the folder is empty
    emptyDir(config.STARTER_FOLDER, (err, result) => {
      if (err) {
        logger.error(err);
      } else if (result) {
        cloneStarter(config);
        cloneDefaultTheme(config);
      } else {
        // Folder is not empty
        logger.error(`Folder already exists and it's not empty. 
        Change the destination folder or remove it.`);
      }
    });
  } else {
    // The folder doesn't exists. Make it
    logger.message(`Create folder ${config.STARTER_FOLDER}...`);
    if (shell.mkdir('-p', config.STARTER_FOLDER).code !== 0) {
      logger.error(`Error: Impossible to create deck folder ${config.STARTER_FOLDER}`);
      shell.exit(1);
    }
    // Start to clone.
    cloneStarter(config);
    cloneDefaultTheme(config);
  }
};
