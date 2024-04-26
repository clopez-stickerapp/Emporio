import * as ts from 'typescript';
import type { ProgramTransformerExtras, PluginConfig } from 'ts-patch';

export function createModuleTypeFilenameTransformer(
  program: ts.Program,
  host: ts.CompilerHost | undefined,
  _: PluginConfig,
  { ts: tsInstance }: ProgramTransformerExtras,
) {
  const needsMjs = program.getCompilerOptions().module !== ts.ModuleKind.CommonJS;

  const newHost: ts.CompilerHost | undefined = host
    ? {
        ...host!,
        writeFile: (fileName, text, writeByteOrderMark, onError, sourceFiles, data) => {
          if (needsMjs && fileName.endsWith('.js')) {
            fileName = fileName.replace(/\.js$/, '.mjs');
          }
          return host!.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
        },
      }
    : undefined;

  return tsInstance.createProgram(
    program.getRootFileNames(),
    program.getCompilerOptions(),
    newHost,
    program,
  );
}
