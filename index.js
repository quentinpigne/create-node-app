#!/usr/bin/env node

'use strict';

const commander = require('commander');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const packageJson = require('./package.json');

let projectName;

function init() {
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .argument('<project-name>', 'Name of the project (Used for directory name)')
    .action((name) => (projectName = name))
    .parse(process.argv);

  createNodeApp();
}

function createNodeApp() {
  const root = path.resolve(projectName);
  const appName = path.basename(root);

  fs.ensureDirSync(root);

  const packageJson = {
    name: appName,
    version: '0.0.1-SNAPSHOT',
  };
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os.EOL);
}

init();
