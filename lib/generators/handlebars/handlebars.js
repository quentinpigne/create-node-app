'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

const { getAllFiles } = require('../../utils/file');

Handlebars.registerHelper('capitalize', require('./helpers/capitalize'));

module.exports.applyTemplate = (context, dirName, inputFile, outputPath, outputFile, subPath) => {
  const templateFilePath = Array.isArray(subPath)
    ? path.join(dirName, 'templates', ...subPath, `${inputFile}.hbs`)
    : path.join(dirName, 'templates', `${inputFile}.hbs`);
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const compiledTemplate = Handlebars.compile(templateFile);
  fs.ensureDirSync(outputPath);
  fs.writeFileSync(path.join(outputPath, outputFile ?? inputFile), compiledTemplate(context));
};

module.exports.registerPartials = (dirName) => {
  const basePath = path.join(dirName, 'templates', 'partials');
  getAllFiles(basePath).forEach((file) => {
    const partialName = `${file.path.join('-')}-${file.fileName.split('.').slice(0, -1).join('-')}`;
    const partialFilePath = Array.isArray(file.path)
      ? path.join(dirName, 'templates/partials', ...file.path, file.fileName)
      : path.join(dirName, 'templates/partials', file.fileName);
    const partialFile = fs.readFileSync(partialFilePath, 'utf8');
    Handlebars.registerPartial(partialName, partialFile);
  });
};
