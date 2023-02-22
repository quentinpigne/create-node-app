import path from 'path';

import { Context } from '../../../types';
import { getGeneratorPath } from '../../utils/file';
import { applyTemplate, registerPartials } from '../handlebars/handlebars';

type ServerContext = {
  headersPartial: () => string;
  corePartial: () => string;
  noFramework: () => boolean;
  expressFramework: () => boolean;
  fastifyFramework: () => boolean;
  routing: () => boolean;
  serveStatic: () => boolean;
  helloEndpoint: () => boolean;
  helloEndpointNoRouting: () => boolean;
  pinoLogger: () => boolean;
  monitoring: () => boolean;
};

export const generate = (context: Context): void => {
  if (!context.config.server_side) return;

  const generatorPath: string = getGeneratorPath(context.cliPath, 'server');
  registerPartials(generatorPath);

  const fileExtension: string = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName: string = `server.${fileExtension}`;
  const outputPath: string = path.join(context.projectPath, 'config', 'initializers');
  const templateContext: ServerContext = {
    headersPartial: () => `headers-${context.config.framework}-${fileExtension}`,
    corePartial: () => `core-${context.config.framework}-${fileExtension}`,
    noFramework: () => context.config.framework === 'none',
    expressFramework: () => context.config.framework === 'express',
    fastifyFramework: () => context.config.framework === 'fastify',
    routing: () => context.config.routing,
    serveStatic: () => context.config.serve_static,
    helloEndpoint: () => context.config.hello_endpoint,
    helloEndpointNoRouting: () => !context.config.routing && context.config.hello_endpoint,
    pinoLogger: () => context.config.logger === 'pino',
    monitoring: () => context.config.monitoring,
  };

  applyTemplate(templateContext, generatorPath, fileName, outputPath);
};
