'use strict';
const path = require('path');

const applyTemplate = require('../utils/handlebars');

module.exports = (context) => {
  const fileName = `logger.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const outputPath = path.join(context.projectPath, 'lib');
  const templateContext = {};

  applyTemplate(templateContext, fileName, outputPath);
};
