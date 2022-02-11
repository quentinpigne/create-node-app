'use strict';
const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  const fileName = `index.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const templateContext = {
    initializers: [context.config.server_side ? 'server' : null].filter((val) => !!val),
  };

  applyTemplate(templateContext, __dirname, fileName, context.projectPath);
};
