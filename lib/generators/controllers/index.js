'use strict';
const path = require('path');

const { applyTemplate } = require('../utils/handlebars');

module.exports = (context) => {
  if (!context.config.hello_endpoint) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  let fileName = `hello.controller.${fileExtension}`;
  let outputPath = path.join(context.projectPath, 'app', 'controllers');
  let templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
