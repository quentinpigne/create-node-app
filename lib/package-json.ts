import { Context } from '../types';
import { Config } from './config/types';

interface PackageJson {
  name: string;
  version: string;
  description: string;
  main: string;
  scripts: {
    [key: string]: string;
  };
  nodemonConfig?: {
    exec: string;
  };
}

const getStartCommand = (config: Config): string => {
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

const getMainFile = (language: string): string => (language === 'javascript' ? 'index.js' : 'index.ts');

const getLanguageExtension = (language: string): string => (language === 'javascript' ? 'js' : 'ts');

export default (context: Context): PackageJson => {
  const packageJson: PackageJson = {
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
  if (context.config.testing_tool !== 'none') {
    packageJson.scripts.test = context.config.testing_tool;
  }
  if (context.config.file_watcher === 'nodemon' && context.config.language === 'typescript') {
    packageJson.nodemonConfig = {
      exec: 'ts-node -r tsconfig-paths/register',
    };
  }
  return packageJson;
};
