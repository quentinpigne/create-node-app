import path from 'path';

import { Context } from '../../../types';
import { getGeneratorPath } from '../../utils/file';
import { DatabaseDialect } from '../../utils/database';
import { applyTemplate } from '../handlebars/handlebars';

type TypeormContext = {
  pinoLogger: () => boolean;
  dialect: string;
};

export const generate = (context: Context): void => {
  if (context.config.database_tool !== 'typeorm') return;

  const fileExtension: string = context.config.language === 'javascript' ? 'js' : 'ts';
  const fileName: string = `typeorm.${fileExtension}`;
  const outputPath: string = path.join(context.projectPath, 'config', 'initializers');
  const templateContext: TypeormContext = {
    pinoLogger: () => context.config.logger === 'pino',
    dialect: DatabaseDialect[context.config.database],
  };

  applyTemplate(templateContext, getGeneratorPath(context.cliPath, 'typeorm'), fileName, outputPath);
};
