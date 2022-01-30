'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generateIndex = (context) => {
  const indexContext = {};

  const templateFilePath = path.join(__dirname, 'templates/index.js.hbs');
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, 'index.js'), template(indexContext));
};

module.exports = generateIndex;
