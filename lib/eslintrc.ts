import os from 'os';
import path from 'path';
import fs from 'fs-extra';

import { Context } from '../types';

interface EsLintRc {
  root: boolean;
  env?: {
    node: boolean;
  };
  parser?: string;
  parserOptions: {
    ecmaVersion?: string;
    tsconfigRootDir?: string;
    project?: string[];
  };
  plugins?: string[];
  extends: string[];
  rules: {};
}

const getJavascriptConfig = (): Partial<EsLintRc> => ({
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
});

const getTypescriptConfig = (context: Context): Partial<EsLintRc> => ({
  parser: '@typescript-eslint/parser',
  parserOptions: { tsconfigRootDir: context.projectPath, project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
});

const getEslintConfigFile = (context: Context): Partial<EsLintRc> => {
  const languageConfig =
    context.config.language === 'javascript' ? getJavascriptConfig() : getTypescriptConfig(context);
  const eslintrc = {
    root: true,
    ...languageConfig,
    rules: {},
  };
  if (context.config.prettier) eslintrc.extends?.push('plugin:prettier/recommended');
  return eslintrc;
};

export default (context: Context): void => {
  fs.writeFileSync(
    path.join(context.projectPath, '.eslintrc.json'),
    JSON.stringify(getEslintConfigFile(context), null, 2) + os.EOL,
  );
};
