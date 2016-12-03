#!/usr/bin/env node
import argv from 'yargs';
const usage = argv
  .commandDir('cmds')
  .demand(1)
  .help()
  .argv;
