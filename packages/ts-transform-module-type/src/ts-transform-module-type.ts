import * as ts from 'typescript';
import * as path from 'path';

export function createModuleTypeTransformer(program: ts.Program) {
  const needsMjs = program.getCompilerOptions().module !== ts.ModuleKind.CommonJS;

  return (ctx: ts.TransformationContext) => {
    return (sourceFile: ts.SourceFile) => {
      if (!needsMjs) {
        return sourceFile;
      }

      function visitor(node: ts.Node): ts.Node | ts.Node[] {
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier &&
          ts.isStringLiteral(node.moduleSpecifier)
        ) {
          const resolvedModule = ts.resolveModuleName(
            node.moduleSpecifier.text,
            sourceFile.fileName,
            program.getCompilerOptions(),
            ts.sys,
          );
          if (
            resolvedModule.resolvedModule &&
            !resolvedModule.resolvedModule.isExternalLibraryImport
          ) {
            let specifierToUse = node.moduleSpecifier.text;
            if (path.parse(resolvedModule.resolvedModule.resolvedFileName).name === 'index') {
              specifierToUse += '/index.mjs';
            } else {
              specifierToUse += '.mjs';
            }

            if (ts.isImportDeclaration(node)) {
              return ctx.factory.updateImportDeclaration(
                node,
                node.modifiers,
                node.importClause,
                ctx.factory.createStringLiteral(specifierToUse),
                node.attributes,
              );
            } else {
              return ctx.factory.updateExportDeclaration(
                node,
                node.modifiers,
                node.isTypeOnly,
                node.exportClause,
                ctx.factory.createStringLiteral(specifierToUse),
                node.attributes,
              );
            }
          }
        }

        return ts.visitEachChild(node, visitor, ctx);
      }

      const transformedNode = ts.visitEachChild(sourceFile, visitor, ctx);

      return transformedNode;
    };
  };
}
