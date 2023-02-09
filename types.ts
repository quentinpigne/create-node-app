import { Config } from './lib/config/types';

export type CommanderOptions = { projectName: string; [key: string]: string };

export interface Context {
  cliVersion: string;
  projectName: string;
  projectPath: string;
  config: Config;
}

export type Generator = { generate: (context: Context) => void };
