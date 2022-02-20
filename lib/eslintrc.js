const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const getJavascriptConfig = () => ({
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
});

const getTypescriptConfig = (context) => ({
  parser: '@typescript-eslint/parser',
  parserOptions: { tsconfigRootDir: context.projectPath, project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
});

const getEslintConfigFile = (context) => {
  const languageConfig =
    context.config.language === 'javascript' ? getJavascriptConfig() : getTypescriptConfig(context);
  const eslintrc = {
    root: true,
    ...languageConfig,
    rules: {},
  };
  if (context.config.prettier) eslintrc.extends.push('plugin:prettier/recommended');
  return eslintrc;
};

module.exports = (context) => {
  fs.writeFileSync(
    path.join(context.projectPath, '.eslintrc.json'),
    JSON.stringify(getEslintConfigFile(context), null, 2) + os.EOL,
  );
};
