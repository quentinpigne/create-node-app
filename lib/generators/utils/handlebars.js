'use strict';
const Handlebars = require('handlebars');
const path = require('path');

const { getAllFiles, readPartialFile, readTemplateFile, writeTemplateToFile } = require('./file');

Handlebars.registerHelper('capitalize', function (aString) {
  return aString.replace(/^\w/, (c) => c.toUpperCase());
});

module.exports.applyTemplate = (context, inputFile, outputPath, outputFile) => {
  const template = Handlebars.compile(readTemplateFile(inputFile));
  writeTemplateToFile(outputPath, outputFile ?? inputFile, template(context));
};

module.exports.registerPartials = (dirName) => {
  const basePath = path.join(dirName, 'templates', 'partials');
  getAllFiles(basePath).forEach((file) => {
    const partialName = `${file.path.join('-')}-${file.fileName.split('.').slice(0, -1).join('-')}`;
    Handlebars.registerPartial(partialName, readPartialFile(dirName, file.fileName, file.path));
  });
};
