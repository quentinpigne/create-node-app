'use strict';
const path = require('path');

const { getRouterType, getParams, getEnding } = require('./utils');
const { applyTemplate, registerPartials } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (!context.config.routing) return;
  registerPartials(path.join(__dirname, 'templates', 'index', 'partials'), true);

  const fileExtension = context.config.language === 'javascript' ? 'js' : 'ts';
  const outputPath = path.join(context.projectPath, 'config', 'routes');

  let fileName = `index.${fileExtension}`;
  let templateContext = {
    helloEndpoint: () => context.config.hello_endpoint,
    importsPartial: () => `imports-${context.config.framework}-${fileExtension}`,
    routerType: getRouterType(context.config.framework),
    params: () => getParams(context.config),
    fastifyFramework: () => context.config.framework === 'fastify',
    koaFramework: () => context.config.framework === 'koa',
    ending: getEnding(context.config.framework),
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath, undefined, ['index']);

  if (!context.config.hello_endpoint) return;
  registerPartials(path.join(__dirname, 'templates', 'hello', 'partials'), true);

  fileName = `hello.${fileExtension}`;
  templateContext = {
    importsPartial: () => `imports-${context.config.framework}-${fileExtension}`,
    routesPartial: () => `routes-${context.config.framework}-${fileExtension}`,
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath, undefined, ['hello']);
};
