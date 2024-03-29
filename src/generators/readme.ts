import { Context } from '../types';
import { getTemplatePath } from '../utils/file';
import { applyTemplate } from '../handlebars/handlebars';

type ReadmeContext = {
  project_name: string;
  cli_version: string;
};

export const generate = (context: Context): void => {
  const fileName: string = 'readme.md';
  const templateContext: ReadmeContext = {
    project_name: context.projectName,
    cli_version: context.cliVersion,
  };

  applyTemplate(
    templateContext,
    getTemplatePath(context.cliPath, 'readme'),
    fileName,
    context.projectPath,
    'README.md',
  );
};
