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
  const prodDependencies = ['async', 'dotenv', 'nconf', 'morgan', config.logger];
  if (config.logger === 'pino') prodDependencies.push('pino-pretty', 'pino-http');
  if (config.framework && config.framework !== 'none') prodDependencies.push(config.framework);
  if (config.framework && config.framework === 'express') prodDependencies.push('cors', 'body-parser', 'change-case');
  if (config.framework && config.framework === 'express' && config.language === 'javascript')
    prodDependencies.push('require-dir');
  return prodDependencies;
};

const devDependencies = (config) => {
  const devDependencies = [];
  if (config.file_watcher !== 'none') devDependencies.push(config.file_watcher);
  if (config.prettier) devDependencies.push('prettier');
  if (config.language === 'typescript') {
    devDependencies.push('@types/async', '@types/nconf', '@types/morgan', '@types/node', 'ts-node', 'typescript');
    if (config.framework && config.framework === 'express')
      devDependencies.push('@types/express', '@types/cors', '@types/body-parser');
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
