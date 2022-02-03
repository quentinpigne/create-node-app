'use strict';

const applyTemplate = require('../utils/handlebars');

module.exports = (context) => {
  const fileName = 'readme.md';
  const templateContext = {
    project_name: context.projectName,
    cli_version: context.cliVersion,
  };

  applyTemplate(templateContext, fileName, context.projectPath, 'README.md');
};
