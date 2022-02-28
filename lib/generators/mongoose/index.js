'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (!context.config.mongoose) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `mongoose.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'config', 'initializers');
  const templateContext = {
    pinoLogger: () => context.config.logger === 'pino',
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
