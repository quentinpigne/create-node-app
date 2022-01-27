#!/usr/bin/env node

'use strict';

const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const packageJson = require('./package.json');

const config = require('./lib/config');
const { generatePackageJson } = require('./lib/generators');

const argsAndOptions = () => {
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
  const options = argsAndOptions();
  const starterConfig = await config.getConfig(options.config);

  createNodeApp(options, starterConfig);
}

function createNodeApp(options, starterConfig) {
  const projectPath = path.resolve(options.projectName);
  fs.ensureDirSync(projectPath);

  generatePackageJson(projectPath, options);
}

init();
