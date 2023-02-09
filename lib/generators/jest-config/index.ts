import { Context } from '../../../types';
import { applyTemplate } from '../handlebars/handlebars';

type JestConfigContext = {
  typescript: () => boolean;
};

export const generate = (context: Context): void => {
  if (context.config.testing_tool !== 'jest') return;

  const fileName: string = `jest.config.js`;
  const templateContext: JestConfigContext = {
    typescript: () => context.config.language === 'typescript',
  };

  applyTemplate(templateContext, __dirname, fileName, context.projectPath);
};
