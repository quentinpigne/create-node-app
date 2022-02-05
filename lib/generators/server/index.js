'use strict';
const Handlebars = require('handlebars');
const path = require('path');

const applyTemplate = require('../utils/handlebars');
const { readPartialFile } = require('../utils/file');

Handlebars.registerPartial('headers-none-js', readPartialFile(__dirname, 'none.js', ['headers']));
Handlebars.registerPartial('headers-none-ts', readPartialFile(__dirname, 'none.ts', ['headers']));
Handlebars.registerPartial('headers-express-js', readPartialFile(__dirname, 'express.js', ['headers']));
Handlebars.registerPartial('headers-express-ts', readPartialFile(__dirname, 'express.ts', ['headers']));
Handlebars.registerPartial('core-none-js', readPartialFile(__dirname, 'none.js', ['core']));
Handlebars.registerPartial('core-none-ts', readPartialFile(__dirname, 'none.ts', ['core']));
Handlebars.registerPartial('core-express-js', readPartialFile(__dirname, 'express.js', ['core']));
Handlebars.registerPartial('core-express-ts', readPartialFile(__dirname, 'express.ts', ['core']));

module.exports = (context) => {
  if (!context.config.server_side) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `server.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'config', 'initializers');
  const templateContext = {
    headersPartial: () => `headers-${context.config.framework}-${fileExtension}`,
    corePartial: () => `core-${context.config.framework}-${fileExtension}`,
    noFramework: () => context.config.framework === 'none',
    expressFramework: () => context.config.framework === 'express',
  };

  applyTemplate(templateContext, fileName, outputPath);
};
