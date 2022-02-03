'use strict';
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const path = require('path');

Handlebars.registerHelper('capitalize', function (aString) {
  return aString.replace(/^\w/, (c) => c.toUpperCase());
});

module.exports = (context, inputFile, outputPath, outputFile) => {
  const templateFilePath = path.join(__dirname, `../${inputFile.split('.')[0]}/templates/${inputFile}.hbs`);
  const templateFile = fs.readFileSync(templateFilePath, 'utf8');
  const template = Handlebars.compile(templateFile);

  fs.ensureDirSync(outputPath);
  fs.writeFileSync(path.join(outputPath, outputFile ?? inputFile), template(context));
};
