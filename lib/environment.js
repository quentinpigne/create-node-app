const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const getDevelopmentEnvironementFile = (context) => {
  const environment = {};
  return environment;
};

module.exports = (context) => {
  const environmentPath = path.join(context.projectPath, 'config', 'environments');
  fs.ensureDirSync(environmentPath);
  fs.writeFileSync(
    path.join(environmentPath, 'development.json'),
    JSON.stringify(getDevelopmentEnvironementFile(context), null, 2) + os.EOL,
  );
};
