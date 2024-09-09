import * as fs from 'fs';
import * as path from 'path';

const fileNames = fs.readdirSync( path.resolve( __dirname ) )
.filter( fileName => ![ 'generate.ts', 'index.ts' ].includes( fileName ) )
.map( file => `export * from './${ file.replace( /\.[tj]s$/, '' ) }';` )

fs.writeFileSync( path.resolve( __dirname, 'index.ts' ), fileNames.join( '\n' ) );