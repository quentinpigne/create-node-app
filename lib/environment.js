'use strict';
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const getDevelopmentEnvironementFile = (context) => {
  const environment = {};
  if (context.config.routing)
    environment.api = {
      prefix: '/',
    };
  if (context.config.database_tool === 'mongoose')
    environment.mongo = {
      url: 'mongodb://localhost:27017',
      user: '',
      pass: '',
      database: '',
    };
  return environment;
};

module.exports = (context) => {
  const environmentPath = path.join(context.projectPath, 'config', 'environments');
  fs.ensureDirSync(environmentPath);
  fs.writeFileSync(
    path.join(environmentPath, 'development.json'),
    JSON.stringify(getDevelopmentEnvironementFile(context), null, 2) + os.EOL,
  );
};
