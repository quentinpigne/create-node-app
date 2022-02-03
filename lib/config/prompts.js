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
    !fileConfig?.language
      ? {
          type: 'list',
          name: 'language',
          message: 'Which language do you want to use?',
          choices: ['javascript', 'typescript'],
        }
      : null,
    !fileConfig?.file_watcher
      ? {
          type: 'list',
          name: 'file_watcher',
          message: 'Which file watcher do you want to use?',
          choices: (prev) =>
            ['none', 'nodemon', prev.language === 'typescript' ? 'ts-node-dev' : null].filter((val) => !!val),
        }
      : null,
    !fileConfig?.prettier
      ? {
          type: 'confirm',
          name: 'prettier',
          message: 'Do you want to use Prettier?',
          default: true,
        }
      : null,
    !fileConfig?.server_side
      ? {
          type: 'confirm',
          name: 'server_side',
          message: 'Do you want to add a server side?',
          default: true,
        }
      : null,
    !fileConfig?.framework
      ? {
          when: (prev) => prev.server_side,
          type: 'list',
          name: 'framework',
          message: 'Which framework do you want to use?',
          choices: ['none'],
        }
      : null,
  ].filter((val) => !!val);
