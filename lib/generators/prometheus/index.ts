import path from 'path';

import { Context } from '../../../types';
import { applyTemplate } from '../handlebars/handlebars';

export const generate = (context: Context): void => {
  if (!context.config.monitoring) return;

  const fileName: string = `prometheus.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const outputPath: string = path.join(context.projectPath, 'lib');
  const templateContext: {} = {};

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
