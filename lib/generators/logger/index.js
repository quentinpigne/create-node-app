'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generateLogger = (context) => {
  const indexContext = {};

  const templateFilePath = path.join(__dirname, 'templates/logger.js.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.ensureDirSync(path.join(context.projectPath, 'lib'));
  fs.writeFileSync(path.join(context.projectPath, 'lib', 'logger.js'), template(indexContext));
};

module.exports = generateLogger;
