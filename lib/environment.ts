import os from 'os';
import path from 'path';
import fs from 'fs-extra';

import { Context } from '../types';

interface Environment {
  api?: { prefix: string };
  mongo?: {
    url: string;
    user: string;
    pass: string;
    database: string;
  };
}

const getDevelopmentEnvironementFile = (context: Context): Environment => {
  const environment: Environment = {};
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

export default (context: Context): void => {
  const environmentPath: string = path.join(context.projectPath, 'config', 'environments');
  fs.ensureDirSync(environmentPath);
  fs.writeFileSync(
    path.join(environmentPath, 'development.json'),
    JSON.stringify(getDevelopmentEnvironementFile(context), null, 2) + os.EOL,
  );
};
