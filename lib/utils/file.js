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

module.exports = {
  getAllFiles,
};
