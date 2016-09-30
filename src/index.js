#!/usr/bin/env node
const yargs = require('yargs');

yargs.commandDir('cmds').demand(1).help().argv;
