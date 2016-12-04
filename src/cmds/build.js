'use strict';
import shell from 'shelljs';
// Build Command
//--------------
exports.command = 'build';
exports.desc = 'Build all assets for the speaker deck.';
exports.handler = argv => {
  shell.exec(`confetti-loader --config confetti.loader.json | confetti-generator`);
};
