'use strict';
const path = require('path');

const { applyTemplate, registerPartials } = require('../handlebars/handlebars');

registerPartials(__dirname);

module.exports = (context) => {
  if (!context.config.hello_endpoint) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `hello.controller.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'app', 'controllers');
  const templateContext = {
    importsPartial: () => `imports-${context.config.framework}-${fileExtension}`,
    endpointPartial: () => `endpoint-${context.config.framework}-${fileExtension}`,
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
