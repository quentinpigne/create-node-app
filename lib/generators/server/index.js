'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const generateServer = (context) => {
  const indexContext = {};

  const outputFile = context.config.language === 'javascript' ? 'server.js' : 'server.ts';
  const templateFilePath = path.join(__dirname, `templates/${outputFile}.hbs`);
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.ensureDirSync(path.join(context.projectPath, 'config', 'initializers'));
  fs.writeFileSync(path.join(context.projectPath, 'config', 'initializers', outputFile), template(indexContext));
};

module.exports = generateServer;
