import { QuestionCollection } from 'inquirer';

import { Config } from './types';
import { DatabaseDriver } from '../utils/database';

export default (fileConfig: Config): QuestionCollection<Config> =>
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
          choices: (prev: Config) =>
            ['none', 'nodemon', prev.language === 'typescript' ? 'ts-node-dev' : null].filter((val) => !!val),
        }
      : null,
    !fileConfig?.logger
      ? {
          type: 'list',
          name: 'logger',
          message: 'Which logger do you want to use?',
          choices: ['winston', 'pino'],
        }
      : null,
    fileConfig?.eslint === undefined
      ? {
          type: 'confirm',
          name: 'eslint',
          message: 'Do you want to use ESLint?',
          default: true,
        }
      : null,
    fileConfig?.prettier === undefined
      ? {
          type: 'confirm',
          name: 'prettier',
          message: 'Do you want to use Prettier?',
          default: true,
        }
      : null,
    !fileConfig?.testing_tool
      ? {
          type: 'list',
          name: 'testing_tool',
          message: 'Do you want to add a testing tool?',
          choices: ['none', 'jest'],
        }
      : null,
    !fileConfig?.database_tool
      ? {
          type: 'list',
          name: 'database_tool',
          message: 'Do you want to add a tool to connect to a database?',
          choices: ['none', 'mongoose', 'sequelize', 'typeorm'],
        }
      : null,
    !fileConfig?.database
      ? {
          when: (prev: Config) => ['sequelize', 'typeorm'].includes(prev.database_tool),
          type: 'list',
          name: 'database',
          message: 'Which type of database do you want to connect to?',
          choices: Object.keys(DatabaseDriver),
        }
      : null,
    fileConfig?.server_side === undefined
      ? {
          type: 'confirm',
          name: 'server_side',
          message: 'Do you want to add a server side?',
          default: true,
        }
      : null,
    !fileConfig?.framework
      ? {
          when: (prev: Config) => prev.server_side,
          type: 'list',
          name: 'framework',
          message: 'Which framework do you want to use?',
          choices: ['none', 'koa', 'express', 'fastify'],
        }
      : null,
    fileConfig?.routing === undefined
      ? {
          when: (prev: Config) => prev.server_side && prev.framework !== 'none',
          type: 'confirm',
          name: 'routing',
          message: 'Do you want to add routing?',
          default: true,
        }
      : null,
    fileConfig?.serve_static === undefined
      ? {
          when: (prev: Config) => prev.server_side && prev.framework !== 'none',
          type: 'confirm',
          name: 'serve_static',
          message: "Do you want to serve static files from 'public' folder?",
          default: true,
        }
      : null,
    fileConfig?.hello_endpoint === undefined
      ? {
          when: (prev: Config) => prev.server_side,
          type: 'confirm',
          name: 'hello_endpoint',
          message: 'Do you want to initialize the project with a hello world endpoint?',
          default: true,
        }
      : null,
    fileConfig?.monitoring === undefined
      ? {
          when: (prev: Config) => prev.server_side,
          type: 'confirm',
          name: 'monitoring',
          message: 'Do you want to add monitoring with Prometheus?',
          default: true,
        }
      : null,
  ].filter((val) => !!val);
