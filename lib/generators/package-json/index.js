'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generatePackageJson = (context) => {
  const packageJsonContext = {
    project_name: context.projectName,
    project_version: '0.0.1-SNAPSHOT',
    project_description: 'A project made from node starter',
    start_bin:
      context.config.file_watcher !== 'none'
        ? context.config.file_watcher
        : context.config.language === 'typescript'
        ? 'ts-node'
        : 'node',
  };

  const templateFilePath = path.join(__dirname, 'package.json.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, 'package.json'), template(packageJsonContext));
};

module.exports = generatePackageJson;
