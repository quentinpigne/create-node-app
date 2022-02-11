'use strict';

const { applyTemplate } = require('../handlebars/handlebars');

module.exports = (context) => {
  const fileName = 'readme.md';
  const templateContext = {
    project_name: context.projectName,
    cli_version: context.cliVersion,
  };

  applyTemplate(templateContext, __dirname, fileName, context.projectPath, 'README.md');
};
