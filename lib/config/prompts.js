module.exports = (fileConfig) =>
  [
    !fileConfig?.language
      ? {
          type: 'list',
          name: 'language',
          message: 'Which language do you want to use?',
          choices: ['javascript', 'typescript'],
        }
      : null,
  ].filter((val) => !!val);
