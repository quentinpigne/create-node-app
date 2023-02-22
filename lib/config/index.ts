import path from 'path';
import fs from 'fs-extra';
import inquirer from 'inquirer';

import prompts from './prompts';
import { Config } from './types';

export * from './types';

export const getConfig = async (configFile: any): Promise<Config> => {
  const configFilePath: string | undefined = configFile ? path.resolve(configFile) : undefined;

  const fileConfig: Config = configFilePath ? JSON.parse(fs.readFileSync(configFilePath, 'utf-8')) : {};
  const userConfig: Config = await inquirer.prompt(prompts(fileConfig));

  return { ...fileConfig, ...userConfig };
};
