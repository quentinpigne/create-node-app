'use strict';
const path = require('path');

const { applyTemplate } = require('../utils/handlebars');

module.exports = (context) => {
  if (!context.config.routing) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `index.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'app', 'routes');
  const templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
