'use strict';
import shell from 'shelljs';
import config from './../config';
import fs from 'fs';
// Build Command
//--------------
exports.command = 'build';
exports.desc = 'Build all assets for the speaker deck.';
exports.handler = argv => {
  const pkg = JSON.parse(fs.readFileSync(`${config.STARTER_REPOSITORY_NAME}/package.json`, 'utf8'));
  shell.exec(pkg.scripts.build);
};
