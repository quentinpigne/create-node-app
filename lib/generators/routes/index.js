'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (!context.config.routing) return;

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const outputPath = path.join(context.projectPath, 'app', 'routes');

  let fileName = `index.${fileExtension}`;
  let templateContext = {
    helloEndpoint: () => context.config.hello_endpoint,
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath, undefined, [context.config.framework]);

  if (!context.config.hello_endpoint) return;

  fileName = `hello.${fileExtension}`;
  templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath, undefined, [context.config.framework]);
};
