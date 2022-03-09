'use strict';
const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  const fileName = `index.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const templateContext = {
    initializers: [
      context.config.database_tool !== 'none' ? context.config.database_tool : null,
      context.config.server_side ? 'server' : null,
    ].filter((val) => !!val),
    reflectMetadata: () => context.config.hello_endpoint || context.config.database_tool === 'typeorm',
    pinoLogger: () => context.config.logger === 'pino',
  };

  applyTemplate(templateContext, __dirname, fileName, context.projectPath);
};
