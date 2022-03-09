'use strict';
const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const getTsConfigFile = (context) => {
  const tsConfig = {
    compilerOptions: {},
  };
  tsConfig.compilerOptions.target = 'es2017';
  tsConfig.compilerOptions.module = 'commonjs';
  tsConfig.compilerOptions.rootDir = './';
  tsConfig.compilerOptions.outDir = 'dist/';
  if (context.config.hello_endpoint || context.config.database_tool === 'typeorm') {
    tsConfig.compilerOptions.experimentalDecorators = true;
    tsConfig.compilerOptions.emitDecoratorMetadata = true;
  }
  tsConfig.compilerOptions.baseUrl = './';
  tsConfig.compilerOptions.paths = {
    '@app/*': ['app/*'],
    '@lib/*': ['lib/*'],
    '@config/*': ['config/*'],
    '@initializers/*': ['config/initializers/*'],
  };
  if (context.config.hello_endpoint) {
    tsConfig.compilerOptions.paths['@controllers/*'] = ['app/controllers/*'];
  }
  tsConfig.compilerOptions.esModuleInterop = true;
  tsConfig.compilerOptions.forceConsistentCasingInFileNames = true;
  tsConfig.compilerOptions.strict = true;
  tsConfig.compilerOptions.skipLibCheck = true;
  return tsConfig;
};

module.exports = (context) => {
  fs.writeFileSync(
    path.join(context.projectPath, 'tsconfig.json'),
    JSON.stringify(getTsConfigFile(context), null, 2) + os.EOL,
  );
};
