import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import spawn from 'cross-spawn';
import { Command } from 'commander';

import packageJsonCli from './package.json';

import { Config, getConfig } from './lib/config';
import writeEslintRc from './lib/eslintrc';
import packageJson from './lib/package-json';
import { installDependencies } from './lib/install';
import writeTsConfigFile from './lib/tsconfig';
import writeEnvironmentFiles from './lib/environment';
import { File, getAllFiles } from './lib/utils/file';

import { CommanderOptions, Context, Generator } from './types';

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

  const context: Context = { cliVersion: packageJsonCli.version, projectName, projectPath, config: starterConfig };

  fs.ensureDirSync(context.projectPath);
  process.chdir(projectPath);

  fs.copySync(path.join(__dirname, '/lib/static'), projectPath, {
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

  const generatorsPath: string = path.join(__dirname, 'lib', 'generators');
  getAllFiles(generatorsPath, undefined, undefined, {
    filter: (fullPath: string) => !!fullPath.match('templates|handlebars|utils'),
  }).forEach((generatorFile: File) => {
    import(path.join(generatorsPath, ...generatorFile.path, generatorFile.fileName)).then((generator: Generator) =>
      generator.generate(context),
    );
  });

  if (context.config.prettier) {
    spawn.sync('npx', ['prettier', `**/*.${context.config.language === 'javascript' ? 'js' : 'ts'}`, '--write'], {
      stdio: 'inherit',
    });
  }
}

init();
