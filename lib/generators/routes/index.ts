import path from 'path';

import { Context } from '../../../types';
import { Config } from '../../config/types';
import { getEnding, getParams, getRouterType } from './utils';
import { applyTemplate, registerPartials } from '../handlebars/handlebars';

type RoutesContext = {
  helloEndpoint: () => boolean;
  importsPartial: () => string;
  routerType?: string;
  params: (config: Config) => string | undefined;
  fastifyFramework: () => boolean;
  koaFramework: () => boolean;
  ending?: string;
};

type HelloEndpointContext = {
  importsPartial: () => string;
  routesPartial: () => string;
};

export const generate = (context: Context): void => {
  if (!context.config.routing) return;
  registerPartials(path.join(__dirname, 'templates', 'index', 'partials'), true);

  const fileExtension: string = context.config.language === 'javascript' ? 'js' : 'ts';
  const outputPath: string = path.join(context.projectPath, 'config', 'routes');

  let fileName: string = `index.${fileExtension}`;
  const templateContext: RoutesContext = {
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
  const helloEndpointTemplateContext: HelloEndpointContext = {
    importsPartial: () => `imports-${context.config.framework}-${fileExtension}`,
    routesPartial: () => `routes-${context.config.framework}-${fileExtension}`,
  };

  applyTemplate(helloEndpointTemplateContext, __dirname, fileName, outputPath, undefined, ['hello']);
};
