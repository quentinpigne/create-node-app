'use strict';
const Handlebars = require('handlebars');
const path = require('path');

const applyTemplate = require('../utils/handlebars');
const { readPartialFile } = require('../utils/file');

Handlebars.registerPartial('none-js', readPartialFile(__dirname, 'none.js'));
Handlebars.registerPartial('none-ts', readPartialFile(__dirname, 'none.ts'));

module.exports = (context) => {
  if (!context.config.server_side) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `server.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'config', 'initializers');
  const templateContext = {
    framework: () => `${context.config.framework}-${fileExtension}`,
    noFramework: () => context.config.framework === 'none',
  };

  applyTemplate(templateContext, fileName, outputPath);
};
