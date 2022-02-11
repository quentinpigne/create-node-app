'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (!context.config.hello_endpoint) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `hello.controller.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'app', 'controllers');
  const templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath, undefined, [context.config.framework]);
};
