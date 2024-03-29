import os from 'os';
import url from 'url';
import path from 'path';
import fs from 'fs-extra';
import spawn from 'cross-spawn';
import { Command } from 'commander';

import packageJsonCli from '../package.json';

import { Config, getConfig } from './config';
import writeEslintRc from './eslintrc';
import packageJson from './package-json';
import { installDependencies } from './install';
import writeTsConfigFile from './tsconfig';
import writeEnvironmentFiles from './environment';
import * as generators from './generators';

import { CommanderOptions, Context, Generator } from './types';

const __dirname: string = path.dirname(url.fileURLToPath(import.meta.url));

const nameAndOptions = (): CommanderOptions => {
  let projectName: string = '';
  const program: Command = new Command(packageJsonCli.name)
    .version(packageJsonCli.version)
    .argument('<project-name>', 'The name of the project (used for directory name)')
    .action((name: string) => {
      projectName = name;
    })
    .option('-c, --config <config-file>', 'The path to the config file (optionnal)')
    .parse(process.argv);

  return { ...program.opts(), projectName };
};

async function init(): Promise<void> {
  const { projectName, ...options } = nameAndOptions();
  const projectPath: string = path.resolve(projectName);
  const starterConfig: Config = await getConfig(options.config);

  const context: Context = {
    cliVersion: packageJsonCli.version,
    cliPath: path.resolve(__dirname, '..'),
    projectName,
    projectPath,
    config: starterConfig,
  };

  fs.ensureDirSync(context.projectPath);
  process.chdir(projectPath);

  fs.copySync(path.join(context.cliPath, 'static'), projectPath, {
    filter: (src: string) => {
      if (!context.config.prettier && src.match('.prettierrc')) return false;
      return true;
    },
  });

  fs.writeFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson(context), null, 2) + os.EOL);

  installDependencies(context.config);

  if (context.config.language === 'typescript') {
    writeTsConfigFile(context);
  }

  if (context.config.eslint) writeEslintRc(context);
  writeEnvironmentFiles(context);

  if (context.config.serve_static) {
    fs.ensureDirSync(path.join(context.projectPath, 'public'));
  }

  Object.values(generators).forEach((generator: Generator) => generator.generate(context));

  if (context.config.prettier) {
    spawn.sync('npx', ['prettier', `**/*.${context.config.language === 'javascript' ? 'js' : 'ts'}`, '--write'], {
      stdio: 'inherit',
    });
  }
}

init().catch((error) => {
  console.error(error);
});
