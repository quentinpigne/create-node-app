'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const getStartCommand = (config) => {
  switch (config.file_watcher) {
    case 'nodemon':
      return 'nodemon';
    case 'ts-node-dev':
      return 'tsnd --respawn';
    default:
      if (config.language === 'typescript') {
        return 'ts-node';
      } else {
        return 'node';
      }
  }
};

const generatePackageJson = (context) => {
  const packageJsonContext = {
    project_name: context.projectName,
    project_version: '0.0.1-SNAPSHOT',
    project_description: 'A project made from node starter',
    main_file: context.config.language === 'javascript' ? 'index.js' : 'index.ts',
    start_command: getStartCommand(context.config),
  };

  const templateFilePath = path.join(__dirname, 'package.json.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, 'package.json'), template(packageJsonContext));
};

module.exports = generatePackageJson;
