#!/usr/bin/env node

'use strict';

const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const spawn = require('cross-spawn');

const packageJson = require('./package.json');

const config = require('./lib/config');
const generators = require('./lib/generators');
const installDependencies = require('./lib/install');

const nameAndOptions = () => {
  let projectName;
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
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

  const context = { cliVersion: packageJson.version, projectName, projectPath, config: starterConfig };

  fs.ensureDirSync(context.projectPath);
  process.chdir(projectPath);

  fs.copySync(path.join(__dirname, '/lib/static'), projectPath);

  generators.generatePackageJson(context);
  generators.generateReadme(context);

  installDependencies(context.config);

  if (context.config.language === 'typescript') {
    spawn.sync('npx', ['tsc', '--init'], { stdio: 'inherit' });
  }

  generators.generateLogger(context);
  generators.generateIndex(context);
  if (context.config.server_side && context.config.framework === 'none') generators.generateServer(context);
}

init();
