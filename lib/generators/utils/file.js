'use strict';
const fs = require('fs-extra');
const path = require('path');

module.exports.readPartialFile = (dirname, inputFile, subPath) => {
  const templateFilePath = Array.isArray(subPath)
    ? path.join(dirname, 'templates/partials', ...subPath, `${inputFile}.hbs`)
    : path.join(dirname, 'templates/partials', `${inputFile}.hbs`);
  return fs.readFileSync(templateFilePath, 'utf8');
};

module.exports.readTemplateFile = (inputFile) => {
  const templateFilePath = path.join(__dirname, `../${inputFile.split('.')[0]}/templates/${inputFile}.hbs`);
  return fs.readFileSync(templateFilePath, 'utf8');
};

module.exports.writeTemplateToFile = (outputPath, outputFile, template) => {
  fs.ensureDirSync(outputPath);
  fs.writeFileSync(path.join(outputPath, outputFile), template);
};
