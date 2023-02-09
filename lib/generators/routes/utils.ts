import { Config, Framework } from '../../config/types';

export const getRouterType = (framework: Framework): string | undefined => {
  switch (framework) {
    case 'koa':
      return '() => IMiddleware';
    case 'express':
      return '() => Router';
    case 'fastify':
      return 'FastifyPluginCallback';
  }
};

export const getParams = (config: Config): string | undefined => {
  if (config.framework !== 'fastify') return;
  return config.language === 'javascript'
    ? 'fastify, opts, done'
    : 'fastify: FastifyInstance, opts: RegisterOptions, done: () => void';
};

export const getEnding = (framework: Framework): string | undefined => {
  switch (framework) {
    case 'koa':
      return 'return router.routes();';
    case 'express':
      return 'return router;';
    case 'fastify':
      return 'done();';
  }
};
