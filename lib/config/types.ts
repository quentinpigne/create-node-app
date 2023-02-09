export type PackageManager = 'npm' | 'yarn' | 'pnpm';

export type Language = 'javascript' | 'typescript';

export type FileWatcher = 'none' | 'nodemon' | 'ts-node-dev';

export type Logger = 'winston' | 'pino';

export type TestingTool = 'none' | 'jest';

export type DatabaseTool = 'none' | 'mongoose' | 'sequelize' | 'typeorm';

export type Database = 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'mssql';

export type Framework = 'none' | 'koa' | 'express' | 'fastify';

export interface Config {
  package_manager: PackageManager;
  language: Language;
  file_watcher: FileWatcher;
  logger: Logger;
  eslint: boolean;
  prettier: boolean;
  testing_tool: TestingTool;
  database_tool: DatabaseTool;
  database: Database;
  server_side: boolean;
  framework: Framework;
  serve_static: boolean;
  routing: boolean;
  hello_endpoint: boolean;
  monitoring: boolean;
}
