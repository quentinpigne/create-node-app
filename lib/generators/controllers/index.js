'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (!context.config.hello_endpoint) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const outputPath = path.join(context.projectPath, 'app', 'controllers');

  let fileName = `hello.controller.${fileExtension}`;
  let templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);

  if (!context.config.testing_tool === 'none') return;

  fileName = `hello.controller.spec.${fileExtension}`;
  templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
