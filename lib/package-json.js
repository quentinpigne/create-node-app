'use strict';
const getStartCommand = (config) => {
  switch (config.file_watcher) {
    case 'nodemon':
      return 'nodemon';
    case 'ts-node-dev':
      return 'tsnd -r tsconfig-paths/register --respawn';
    default:
      if (config.language === 'typescript') {
        return 'ts-node -r tsconfig-paths/register';
      } else {
        return 'node';
      }
  }
};

const getMainFile = (language) => (language === 'javascript' ? 'index.js' : 'index.ts');

const getLanguageExtension = (language) => (language === 'javascript' ? 'js' : 'ts');

module.exports = (context) => {
  const packageJson = {
    name: context.projectName,
    version: '0.0.1-SNAPSHOT',
    description: 'A project made from node starter',
    main: getMainFile(context.config.language),
    scripts: {
      start: `${getStartCommand(context.config)} ${getMainFile(context.config.language)}`,
    },
  };
  if (context.config.eslint) {
    packageJson.scripts.lint = `eslint "**/*.${getLanguageExtension(context.config.language)}"`;
  }
  if (context.config.file_watcher === 'nodemon' && context.config.language === 'typescript') {
    packageJson.nodemonConfig = {
      exec: 'ts-node -r tsconfig-paths/register',
    };
  }
  return packageJson;
};
