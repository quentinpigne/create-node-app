const spawn = require('cross-spawn');

const installCommand = (config) => {
  switch (config.package_manager) {
    case 'npm':
      return ['install', '--save', '--save-exact', '--loglevel', 'error'];
    case 'yarn':
    case 'pnpm':
      return ['add', '-E'];
  }
};

const buildDependencies = () => {
  return ['async', 'dotenv', 'nconf', 'winston'];
};

const installDependencies = (config) => {
  const command = config.package_manager;
  const args = [...installCommand(config), ...buildDependencies(config)];
  spawn(command, args, { stdio: 'inherit' });
};

module.exports = installDependencies;
