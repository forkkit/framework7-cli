#!/usr/bin/env node
/* eslint no-console: off */
const program = require('commander');
const exec = require('exec-sh');
const path = require('path');
const fs = require('fs');
const logSymbols = require('log-symbols');
const checkUpdate = require('./utils/check-update');
const spinner = require('./utils/spinner');
const log = require('./utils/log');
const getOptions = require('./create-app/utils/get-options');
const createApp = require('./create-app/index');
const server = require('./ui/server');

const cwd = process.cwd();

/* =============================================
Commands
============================================= */
program
  .command('create')
  .option('-u, --ui', 'Create new Framework7 app using UI')
  .description('Create a new Framework7 project')
  .action(async (options) => {
    // Check update
    spinner.start('Checking for avialable updates...');
    try {
      const hasUpdate = await checkUpdate();
      if (hasUpdate) {
        spinner.error('Update available');
        log.text(`\n${logSymbols.warning} Please update framework7-cli to latest version before continue.`, true);
        log.text(`${logSymbols.warning} To update framework7-cli, run in terminal:`, true);
        log.text('\nnpm install framework7-cli -g', true);
        process.exit(1);
      }
    } catch (err) {
      spinner.error('Error checking update');
      log.error(err.stderr);
      process.exit(1);
      return;
    }
    spinner.done('All good, you have latest framework7-cli version.');

    if (options.ui) {
      spinner.start('Launching Framework7 UI server');
      server();
      spinner.end('Launching Framework7 UI server');
    } else {
      const opts = await getOptions();
      await createApp(
        {
          cwd,
          ...opts,
        },
        {
          statusStart: text => spinner.start(text),
          statusDone: text => spinner.done(text),
          statusError: text => spinner.error(text),
          text: text => log.text(text),
          error: text => log.error(text),
        },
        {
          exitOnError: true,
        },
      );
      process.exit(0);
    }
  });

program
  .command('cordova [args...]')
  .description('Cordova CLI')
  .action(async (args) => {
    if (!fs.existsSync(path.resolve(cwd, './cordova'))) {
      log.error('Looks like cordova project is not set up');
      process.exit(1);
      return;
    }
    exec.promise(`cd ./cordova && cordova ${args.join(' ')}`);
  });

program.parse(process.argv);
