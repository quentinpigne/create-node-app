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

const prodDependencies = () => {
  return ['async', 'dotenv', 'nconf', 'winston'];
};

const devDependencies = (config) => {
  const devDependencies = [];
  if (config.file_watcher !== 'none') devDependencies.push(config.file_watcher);
  if (config.language === 'typescript') {
    devDependencies.push('@types/async', '@types/nconf', '@types/node', 'ts-node', 'typescript');
  }
  return devDependencies;
};

const installDependencies = (config) => {
  const command = config.package_manager;
  spawn.sync(command, [...installCommand(config, false), ...prodDependencies()], { stdio: 'inherit' });
  if (devDependencies(config).length > 0) {
    spawn.sync(command, [...installCommand(config, true), ...devDependencies(config)], { stdio: 'inherit' });
  }
};

module.exports = installDependencies;
