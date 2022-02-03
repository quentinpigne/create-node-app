'use strict';
const path = require('path');

const applyTemplate = require('../utils/handlebars');

module.exports = (context) => {
  if (!context.config.server_side) return;

  const fileName = `server.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const outputPath = path.join(context.projectPath, 'config', 'initializers');
  const templateContext = {};

  applyTemplate(templateContext, fileName, outputPath);
};
