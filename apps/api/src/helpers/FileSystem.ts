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

export function readFolder(folderPath: string): string[] {
	try {
		return fs.readdirSync(folderPath);
	} catch (error) {
		throw new Error(`Error reading folder: ${error}`);
	}
}

export function removeExtension(path: string): string {
	return path.substring(0, path.lastIndexOf("."));
}