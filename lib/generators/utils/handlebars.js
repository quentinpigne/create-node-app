'use strict';
const Handlebars = require('handlebars');

const { readTemplateFile, writeTemplateToFile } = require('./file');

Handlebars.registerHelper('capitalize', function (aString) {
  return aString.replace(/^\w/, (c) => c.toUpperCase());
});

module.exports = (context, inputFile, outputPath, outputFile) => {
  const template = Handlebars.compile(readTemplateFile(inputFile));
  writeTemplateToFile(outputPath, outputFile ?? inputFile, template(context));
};
