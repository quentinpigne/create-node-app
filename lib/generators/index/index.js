'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generateIndex = (context) => {
  const indexContext = {};

  const outputFile = context.config.language === 'javascript' ? 'index.js' : 'index.ts';
  const templateFilePath = path.join(__dirname, `templates/${outputFile}.hbs`);
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.writeFileSync(path.join(context.projectPath, outputFile), template(indexContext));
};

module.exports = generateIndex;
