import path from 'path';
import fs from 'fs-extra';

import Handlebars from 'handlebars';

import capitalize from './helpers/capitalize';
import { getAllFiles } from '../utils/file';

Handlebars.registerHelper('capitalize', capitalize);

export const applyTemplate = (
  context: Record<string, unknown>,
  dirName: string,
  inputFile: string,
  outputPath: string,
  outputFile?: string,
  subPath?: string[],
): void => {
  const templateFilePath: string = Array.isArray(subPath)
    ? path.join(dirName, 'templates', ...subPath, `${inputFile}.hbs`)
    : path.join(dirName, 'templates', `${inputFile}.hbs`);
  const templateFile: string = fs.readFileSync(templateFilePath, 'utf8');
  const compiledTemplate: HandlebarsTemplateDelegate = Handlebars.compile(templateFile);
  fs.ensureDirSync(outputPath);
  fs.writeFileSync(path.join(outputPath, outputFile ?? inputFile), compiledTemplate(context));
};

export const registerPartials = (basePath: string, isCustomPath?: boolean): void => {
  basePath = isCustomPath ? basePath : path.join(basePath, 'templates', 'partials');
  getAllFiles(basePath).forEach((file) => {
    const partialName: string = `${file.path.join('-')}-${file.fileName.split('.').slice(0, -1).join('-')}`;
    const partialFilePath: string = Array.isArray(file.path)
      ? path.join(basePath, ...file.path, file.fileName)
      : path.join(basePath, file.fileName);
    const partialFile: string = fs.readFileSync(partialFilePath, 'utf8');
    Handlebars.registerPartial(partialName, partialFile);
  });
};
