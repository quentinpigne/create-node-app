'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generatePackageJson = (context) => {
  const packageJsonContext = {
    project_name: context.projectName,
    project_version: '0.0.1-SNAPSHOT',
    project_description: 'A project made from node starter',
  };

  const templateFilePath = path.join(__dirname, 'templates/package.json.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, 'package.json'), template(packageJsonContext));
};

const generateReadme = (context) => {
  const readmeContext = {
    project_name: context.projectName,
    cli_version: context.cliVersion,
  };

  const templateFilePath = path.join(__dirname, 'templates/README.md.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, 'README.md'), template(readmeContext));
};

module.exports = {
  generatePackageJson,
  generateReadme,
};
