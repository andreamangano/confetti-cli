import chalk from 'chalk';

export function message(msg) {
  console.log(`${chalk.bold.gray(msg)}`);
}

export function info(msg, iconCode) {
  const icon = String.fromCodePoint(iconCode ? iconCode : 0x1F4E2);
  console.log(`${icon}  ${chalk.bold.underline.blue('Info:')} --> ${chalk.bold.blue(msg)}`);
}

export function error(msg, iconCode) {
  const icon = String.fromCodePoint(iconCode ? iconCode : 0x2757);
  console.log(`${icon}  ${chalk.bold.underline.red('Error:')} --> ${chalk.bold.red(msg)}`);
}

export function warning(msg, iconCode) {
  const icon = String.fromCodePoint(iconCode ? iconCode : 0x26A0);
  console.log(`${icon}  ${chalk.bold.underline.yellow('Warning:')} --> ${chalk.bold.yellow(msg)}`);
}

export function success(msg, iconCode) {
  const icon = String.fromCodePoint(iconCode ? iconCode : 0x1F44C);
  console.log(`${icon}  ${chalk.bold.underline.green('Success:')} --> ${chalk.bold.green(msg)}`);
}
