'use strict';
const fs = require('fs-extra');
const path = require('path');

const getAllFiles = (dirPath, basePath, arrayOfFiles) => {
  basePath = basePath || dirPath;
  arrayOfFiles = arrayOfFiles || [];

  fs.readdirSync(dirPath, { withFileTypes: true }).forEach((file) => {
    if (file.isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file.name), basePath, arrayOfFiles);
    } else {
      const filePath = path.join(dirPath, file.name);
      const relativePath = path.relative(basePath, filePath).split('/');
      const fileName = relativePath.pop();
      arrayOfFiles.push({ path: relativePath, fileName });
    }
  });

  return arrayOfFiles;
};

const readPartialFile = (dirName, inputFile, subPath) => {
  const templateFilePath = Array.isArray(subPath)
    ? path.join(dirName, 'templates/partials', ...subPath, inputFile)
    : path.join(dirName, 'templates/partials', inputFile);
  return fs.readFileSync(templateFilePath, 'utf8');
};

const readTemplateFile = (inputFile) => {
  const templateFilePath = path.join(__dirname, `../${inputFile.split('.')[0]}/templates/${inputFile}.hbs`);
  return fs.readFileSync(templateFilePath, 'utf8');
};

const writeTemplateToFile = (outputPath, outputFile, template) => {
  fs.ensureDirSync(outputPath);
  fs.writeFileSync(path.join(outputPath, outputFile), template);
};

module.exports = {
  getAllFiles,
  readPartialFile,
  readTemplateFile,
  writeTemplateToFile,
};
