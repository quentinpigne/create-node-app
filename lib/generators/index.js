'use strict';
module.exports = {
  generatePackageJson: require('./package-json'),
  generateReadme: require('./readme'),
  generateLogger: require('./logger'),
  generateIndex: require('./index/index'),
  generateServer: require('./server'),
};
