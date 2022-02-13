'use strict';
const path = require('path');

const { applyTemplate, registerPartials } = require('../handlebars/handlebars');

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
    routing: () => context.config.routing,
    serveStatic: () => context.config.serve_static,
    helloEndpoint: () => context.config.hello_endpoint,
    pinoLogger: () => context.config.logger === 'pino',
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
