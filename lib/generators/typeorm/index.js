'use strict';
const path = require('path');

const { DatabaseDialect } = require('../../utils/database');
const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (context.config.database_tool !== 'typeorm') return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName = `typeorm.${fileExtension}`;
  const outputPath = path.join(context.projectPath, 'config', 'initializers');
  const templateContext = {
    pinoLogger: () => context.config.logger === 'pino',
    dialect: DatabaseDialect[context.config.database],
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
