import path from 'path';

import { Context } from '../../../types';
import { DatabaseDialect } from '../../utils/database';
import { applyTemplate } from '../handlebars/handlebars';

type SequelizeContext = {
  pinoLogger: () => boolean;
  dialect: string;
};

export const generate = (context: Context): void => {
  if (context.config.database_tool !== 'sequelize') return;

  const fileExtension: string = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName: string = `sequelize.${fileExtension}`;
  const outputPath: string = path.join(context.projectPath, 'config', 'initializers');
  const templateContext: SequelizeContext = {
    pinoLogger: () => context.config.logger === 'pino',
    dialect: DatabaseDialect[context.config.database],
  };

  applyTemplate(templateContext, __dirname, fileName, outputPath);
};
