#!/usr/bin/env node
'use strict';

const program = require('commander');
const pkg = require('../package.json');

// TODO: remove params

program
  .version(pkg.version)
  .command('init', 'Initialize the speaker desk folder')
  .command('serve', 'Serve the ./build folder')
  .command('deploy', 'Deploy the ./build folder')
  //.command('theme --install [name]', 'Install a given theme among the official themes')
  //.command('theme <install> [name]', 'Install a given theme among the official themes')
  //.command('theme --update', 'Update the theme')
  .parse(process.argv);