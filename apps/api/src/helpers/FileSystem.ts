import fs from 'fs';
import yaml from 'js-yaml';

export function readYaml<T>(filePath: string): T {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf8');
		const yamlData = yaml.load(fileContent) as T;
		return yamlData;
	} catch (error) {
		throw new Error(`Error reading YAML file: ${error}`);
	}
}

export function writeYaml<T>(filePath: string, data: T): void {
	try {
		const yamlData = yaml.dump(data);
		fs.writeFileSync(filePath, yamlData);
	} catch (error) {
		console.error(`Error writing YAML file: ${error}`);
	}
}

function isFolder( path: string ): boolean {
	return fs.statSync(path).isDirectory();
}

export function readFolder(folderPath: string, subDirectory: string = ''): string[] {
	try {
		let contents = fs.readdirSync(folderPath);
		let result: string[] = [];
		for (const content of contents) {
			const contentPath = `${folderPath}/${content}`;
			// If it's a folder, read its contents
			if (isFolder(contentPath)) {
				const subContents = readFolder(contentPath, content + '/');
				result = result.concat(subContents);
			} else {
				result.push(subDirectory + content);
			}
		}
		return result;
	} catch (error) {
		throw new Error(`Error reading folder: ${error}`);
	}
}

export function extractFileName(path: string): string {
	return path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
}