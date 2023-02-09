import path from 'path';
import inquirer from 'inquirer';

import prompts from './prompts';
import { Config } from './types';

export * from './types';

export const getConfig = async (configFile: any): Promise<Config> => {
  const configFilePath: string | undefined = configFile ? path.resolve(configFile) : undefined;

  const fileConfig: Config = configFilePath ? await import(configFilePath) : {};
  const userConfig: Config = await inquirer.prompt(prompts(fileConfig));

  return { ...fileConfig, ...userConfig };
};
