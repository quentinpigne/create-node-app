import path from 'path';

import { Context } from '../../../types';
import { getGeneratorPath } from '../../utils/file';
import { applyTemplate } from '../handlebars/handlebars';

type LoggerContext = {
  fastifyFramework: () => boolean;
};

export const generate = (context: Context): void => {
  const fileName: string = `logger.${context.config.language === 'javascript' ? 'js' : 'ts'}`;
  const outputPath: string = path.join(context.projectPath, 'lib');
  const templateContext: LoggerContext = {
    fastifyFramework: () => context.config.framework === 'fastify',
  };

  applyTemplate(templateContext, getGeneratorPath(context.cliPath, 'logger'), fileName, outputPath, undefined, [
    context.config.logger,
  ]);
};
