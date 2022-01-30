'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generateReadme = (context) => {
  const readmeContext = {
    project_name: context.projectName,
    cli_version: context.cliVersion,
  };

  const templateFilePath = path.join(__dirname, 'README.md.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, 'README.md'), template(readmeContext));
};

module.exports = generateReadme;
