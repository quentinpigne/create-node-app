#!/usr/bin/env node

'use strict';

const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const requireDir = require('require-dir');
const spawn = require('cross-spawn');

const packageJsonCli = require('./package.json');

const config = require('./lib/config');
const writeEslintRc = require('./lib/eslintrc');
const packageJson = require('./lib/package-json');
const installDependencies = require('./lib/install');
const writeTsConfigFile = require('./lib/tsconfig');
const writeEnvironmentFiles = require('./lib/environment');

const nameAndOptions = () => {
  let projectName;
  const program = new commander.Command(packageJsonCli.name)
    .version(packageJsonCli.version)
    .argument('<project-name>', 'The name of the project (used for directory name)')
    .action((name) => (projectName = name))
    .option('-c, --config <config-file>', 'The path to the config file (optionnal)')
    .parse(process.argv);

  return { projectName, ...program.opts() };
};

async function init() {
  const { projectName, ...options } = nameAndOptions();
  const projectPath = path.resolve(projectName);
  const starterConfig = await config.getConfig(options.config);

  const context = { cliVersion: packageJsonCli.version, projectName, projectPath, config: starterConfig };

  fs.ensureDirSync(context.projectPath);
  process.chdir(projectPath);

  fs.copySync(path.join(__dirname, '/lib/static'), projectPath, {
    filter: (src) => {
      if (!context.config.prettier && src.match('.prettierrc')) return false;
      return true;
    },
  });

  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson(context), null, 2) + os.EOL);

  installDependencies(context.config);

  if (context.config.language === 'typescript') {
    writeTsConfigFile(context);
  }

  if (context.config.eslint) writeEslintRc(context);
  writeEnvironmentFiles(context);

  if (context.config.serve_static) {
    fs.ensureDirSync(path.join(context.projectPath, 'public'));
  }

  const generators = requireDir(path.join(__dirname, 'lib', 'generators'), {
    recurse: true,
    filter: (fullPath) => !fullPath.match('templates|handlebars'),
  });
  Object.values(generators).forEach((generator) => generator.index(context));

  if (context.config.prettier) {
    spawn.sync('npx', ['prettier', `**/*.${context.config.language === 'javascript' ? 'js' : 'ts'}`, '--write'], {
      stdio: 'inherit',
    });
  }
}

init();
