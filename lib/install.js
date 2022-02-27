'use strict';
const spawn = require('cross-spawn');

const installCommand = (config, isDev) => {
  switch (config.package_manager) {
    case 'npm':
      return ['install', isDev ? '--save-dev' : '--save', '--save-exact', '--loglevel', 'error'];
    case 'yarn':
    case 'pnpm':
      return ['add', isDev ? '-D' : null, '-E'].filter((val) => !!val);
  }
};

const prodDependencies = (config) => {
  const prodDependencies = ['async', 'dotenv', 'nconf', config.logger];
  if (config.logger === 'pino') prodDependencies.push('pino-pretty', 'pino-http');
  if (config.monitoring) prodDependencies.push('prom-client');
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
  return prodDependencies;
};

const devDependencies = (config) => {
  const devDependencies = [];
  if (config.file_watcher !== 'none') devDependencies.push(config.file_watcher);
  if (config.eslint) {
    devDependencies.push('eslint');
    if (config.prettier) devDependencies.push('eslint-config-prettier', 'eslint-plugin-prettier');
  }
  if (config.prettier) devDependencies.push('prettier');
  if (config.language === 'typescript') {
    devDependencies.push('@types/async', '@types/nconf', '@types/node', 'ts-node', 'typescript');
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

const installDependencies = (config) => {
  const command = config.package_manager;
  spawn.sync(command, [...installCommand(config, false), ...prodDependencies(config)], { stdio: 'inherit' });
  if (devDependencies(config).length > 0) {
    spawn.sync(command, [...installCommand(config, true), ...devDependencies(config)], { stdio: 'inherit' });
  }
};

module.exports = installDependencies;
