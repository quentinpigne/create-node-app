import path from 'path';

import { Context } from '../../../types';
import { applyTemplate } from '../handlebars/handlebars';

type MongooseContext = {
  pinoLogger: () => boolean;
};

export const generate = (context: Context): void => {
  if (context.config.database_tool !== 'mongoose') return;

  const fileExtension: string = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName: string = `mongoose.${fileExtension}`;
  const outputPath: string = path.join(context.projectPath, 'config', 'initializers');
  const templateContext: MongooseContext = {
    pinoLogger: () => context.config.logger === 'pino',
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
