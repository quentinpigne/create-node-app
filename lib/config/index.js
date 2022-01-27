'use strict';
const inquirer = require('inquirer');
const path = require('path');

const getConfig = async (configFile) => {
  const configFilePath = configFile ? path.resolve(configFile) : undefined;

  const fileConfig = configFilePath ? require(configFilePath) : {};
  const userConfig = await inquirer.prompt(require('./prompts')(fileConfig));

  return { ...fileConfig, ...userConfig };
};

module.exports = {
  getConfig,
};
