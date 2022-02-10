'use strict';
const path = require('path');

const { applyTemplate } = require('../utils/handlebars');

module.exports = (context) => {
  if (!context.config.hello_endpoint) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `hello.controller.${fileExtension}.${context.config.framework}`;
  const outputPath = path.join(context.projectPath, 'app', 'controllers');
  const outputFile = `hello.controller.${fileExtension}`;
  const templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath, outputFile);
};
