'use strict';
const path = require('path');

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  if (context.config.testing_tool !== 'jest') return;

  const fileName = `jest.config.js`;
  let templateContext = {
    typescript: () => context.config.language === 'typescript',
  };

  applyTemplate(templateContext, __dirname, fileName, context.projectPath);
};
