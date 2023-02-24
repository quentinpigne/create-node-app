import { Config } from './config/types';

export type CommanderOptions = { projectName: string; [key: string]: string };

export interface Context {
  cliVersion: string;
  cliPath: string;
  projectName: string;
  projectPath: string;
  config: Config;
}

export type Generator = { generate: (context: Context) => void };
