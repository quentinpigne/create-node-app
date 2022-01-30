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
  ].filter((val) => !!val);
