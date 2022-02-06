'use strict';
const { applyTemplate } = require('../utils/handlebars');

module.exports = (context) => {
  const fileName = `index.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const templateContext = {
    initializers: [context.config.server_side ? 'server' : null].filter((val) => !!val),
  };

  applyTemplate(templateContext, fileName, context.projectPath);
};
