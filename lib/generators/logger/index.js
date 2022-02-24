'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  const fileName = `logger.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const outputPath = path.join(context.projectPath, 'lib');
  const templateContext = {
    fastifyFramework: () => context.config.framework === 'fastify',
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath, undefined, [context.config.logger]);
};
