const getStartCommand = (config) => {
  switch (config.file_watcher) {
    case 'nodemon':
      return 'nodemon';
    case 'ts-node-dev':
      return 'tsnd --respawn';
    default:
      if (config.language === 'typescript') {
        return 'ts-node';
      } else {
        return 'node';
      }
  }
};

const getMainFile = (language) => (language === 'javascript' ? 'index.js' : 'index.ts');

module.exports = (context) => {
  return {
    name: context.projectName,
    version: '0.0.1-SNAPSHOT',
    description: 'A project made from node starter',
    main: getMainFile(context.config.language),
    scripts: {
      start: `${getStartCommand(context.config)} ${getMainFile(context.config.language)}`,
    },
  };
};
