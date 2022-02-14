'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (!context.config.monitoring) return;

  const fileName = `prometheus.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const outputPath = path.join(context.projectPath, 'lib');
  const templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
