'use strict';
const path = require('path');

const { applyTemplate, registerPartials } = require('../utils/handlebars');

registerPartials(__dirname);

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
