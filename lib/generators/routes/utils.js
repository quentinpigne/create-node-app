const getRouterType = (framework) => {
  switch (framework) {
    case 'koa':
      return '() => IMiddleware';
    case 'express':
      return '() => Router';
    case 'fastify':
      return 'FastifyPluginCallback';
  }
};

const getParams = (config) => {
  if (config.framework !== 'fastify') return;
  return config.language === 'javascript'
    ? 'fastify, opts, done'
    : 'fastify: FastifyInstance, opts: RegisterOptions, done: () => void';
};

const getEnding = (framework) => {
  switch (framework) {
    case 'koa':
      return 'return router.routes();';
    case 'express':
      return 'return router;';
    case 'fastify':
      return 'done();';
  }
};

module.exports = {
  getRouterType,
  getParams,
  getEnding,
};
