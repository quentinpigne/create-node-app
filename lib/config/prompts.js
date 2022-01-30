'use strict';
module.exports = (fileConfig) =>
  [
    !fileConfig?.package_manager
      ? {
          type: 'list',
          name: 'package_manager',
          message: 'Which package manager do you want to use?',
          choices: ['npm', 'yarn', 'pnpm'],
        }
      : null,
    !fileConfig?.file_watcher
      ? {
          type: 'list',
          name: 'file_watcher',
          message: 'Which file watcher do you want to use?',
          choices: ['none', 'nodemon'],
        }
      : null,
  ].filter((val) => !!val);
