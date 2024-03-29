import spawn from 'cross-spawn';

import { Config } from './config/types';
import { DatabaseDriver } from './utils/database';

const installCommand = (config: Config, isDev: boolean): string[] => {
  switch (config.package_manager) {
    case 'npm':
      return ['install', isDev ? '--save-dev' : '--save', '--save-exact', '--loglevel', 'error'];
    case 'yarn':
    case 'pnpm':
      return ['add', isDev ? '-D' : null, '-E'].filter((val) => !!val) as string[];
    default:
      return [];
  }
};

const prodDependencies = (config: Config): string[] => {
  const prodDependencies = ['async', 'dotenv', 'nconf', config.logger];
  if (config.language === 'typescript') {
    if (config.hello_endpoint || config.database_tool === 'typeorm') prodDependencies.push('reflect-metadata');
  }
  if (config.logger === 'pino') prodDependencies.push('pino-pretty', 'pino-http');
  if (config.monitoring) prodDependencies.push('prom-client');
  if (config.database_tool !== 'none') prodDependencies.push(config.database_tool);
  if (config.database) prodDependencies.push(...DatabaseDriver[config.database]);
  if (config.framework && config.framework !== 'none') prodDependencies.push(config.framework, 'change-case');
  if (config.framework && !['koa', 'fastify'].includes(config.framework)) prodDependencies.push('morgan');
  if (config.framework && config.framework === 'express') prodDependencies.push('cors', 'body-parser');
  if (config.framework && config.framework !== 'none' && config.language === 'javascript')
    prodDependencies.push('require-dir');
  if (config.framework && config.framework === 'koa') {
    prodDependencies.push('koa-bodyparser', 'koa-morgan');
    if (config.logger === 'pino') prodDependencies.push('koa-pino-logger');
    if (config.routing) prodDependencies.push('koa-router');
    if (config.serve_static) prodDependencies.push('koa-static');
  }
  if (config.framework && config.framework === 'fastify') {
    prodDependencies.push('fastify-cors');
    if (config.serve_static) prodDependencies.push('fastify-static');
  }
  if (config.hello_endpoint) prodDependencies.push('typedi');
  return prodDependencies;
};

const devDependencies = (config: Config): string[] => {
  const devDependencies = [];
  if (config.file_watcher !== 'none') devDependencies.push(config.file_watcher);
  if (config.eslint) {
    devDependencies.push('eslint');
    if (config.prettier) devDependencies.push('eslint-config-prettier', 'eslint-plugin-prettier');
  }
  if (config.testing_tool === 'jest') {
    devDependencies.push('jest');
    if (config.language === 'typescript') devDependencies.push('@types/jest', 'ts-jest');
  }
  if (config.prettier) devDependencies.push('prettier');
  if (config.language === 'typescript') {
    devDependencies.push('@types/async', '@types/nconf', '@types/node', 'tsconfig-paths', 'ts-node', 'typescript');
    if (config.eslint) devDependencies.push('@typescript-eslint/parser', '@typescript-eslint/eslint-plugin');
    if (config.framework && config.framework === 'express')
      devDependencies.push('@types/express', '@types/cors', '@types/body-parser');
    if (config.framework && !['koa', 'fastify'].includes(config.framework)) devDependencies.push('@types/morgan');
    if (config.framework && config.framework === 'koa') {
      devDependencies.push('@types/koa', '@types/koa-bodyparser', '@types/koa-morgan');
      if (config.logger === 'pino') devDependencies.push('@types/koa-pino-logger');
      if (config.routing) devDependencies.push('@types/koa-router');
      if (config.serve_static) devDependencies.push('@types/koa-static');
    }
  }
  return devDependencies;
};

export const installDependencies = (config: Config): void => {
  const command = config.package_manager;
  spawn.sync(command, [...installCommand(config, false), ...prodDependencies(config)], { stdio: 'inherit' });
  if (devDependencies(config).length > 0) {
    spawn.sync(command, [...installCommand(config, true), ...devDependencies(config)], { stdio: 'inherit' });
  }
};
