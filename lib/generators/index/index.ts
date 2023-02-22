import { Context } from '../../../types';
import { getGeneratorPath } from '../../utils/file';
import { applyTemplate } from '../handlebars/handlebars';

type IndexContext = {
  initializers: string[];
  reflectMetadata: () => boolean;
  pinoLogger: () => boolean;
};

export const generate = (context: Context): void => {
  const fileName: string = `index.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const templateContext: IndexContext = {
    initializers: [
      context.config.database_tool !== 'none' ? context.config.database_tool : null,
      context.config.server_side ? 'server' : null,
    ].filter((val) => !!val) as string[],
    reflectMetadata: () => context.config.hello_endpoint || context.config.database_tool === 'typeorm',
    pinoLogger: () => context.config.logger === 'pino',
  };

  applyTemplate(templateContext, getGeneratorPath(context.cliPath, 'index'), fileName, context.projectPath);
};
