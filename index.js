#!/usr/bin/env node

'use strict';

const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const packageJson = require('./package.json');

const config = require('./lib/config');
const { generatePackageJson } = require('./lib/generators');

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

  createNodeApp(context);
}

function createNodeApp(context) {
  fs.ensureDirSync(context.projectPath);

  generatePackageJson(context);
}

init();
