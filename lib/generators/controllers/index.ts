import path from 'path';

import { Context } from '../../../types';
import { applyTemplate } from '../handlebars/handlebars';

export const generate = (context: Context): void => {
  if (!context.config.hello_endpoint) return;

  const fileExtension: string = context.config.language === 'javascript' ? 'js' : 'ts';
  const outputPath: string = path.join(context.projectPath, 'app', 'controllers');

  let fileName: string = `hello.controller.${fileExtension}`;
  let templateContext: {} = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);

  if (context.config.testing_tool === 'none') return;

  fileName = `hello.controller.spec.${fileExtension}`;
  templateContext = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};