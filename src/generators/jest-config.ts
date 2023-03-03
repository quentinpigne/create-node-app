import { Context } from '../types';
import { getTemplatePath } from '../utils/file';
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

  applyTemplate(templateContext, getTemplatePath(context.cliPath, 'jest-config'), fileName, context.projectPath);
};
