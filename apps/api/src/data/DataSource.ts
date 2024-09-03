import { readFolder, readYaml } from "$/helpers/FileSystem";
import { removeExtension } from "tsconfig-paths/lib/filesystem";
import { NamedConfig } from "./NamedConfig";

export function readConfigs<T extends NamedConfig>(folder: string): Record<string, T> {
	const configs: Record<string, T> = {};

	for(const configPath of readFolder(folder)) {
		const config = readYaml<T>(folder + "/" + configPath);
		const configName = removeExtension(configPath);

		// Check if config name matches file name
		if(config.name !== configName){
			throw new Error(`Config name '${config.name}' does not match file name '${configName}'`);
		}

		// Check for duplicate config names
		if(configs[configName]){
			throw new Error(`Config with name '${configName}' already exists`);
		}

		configs[configName] = config;
	}

	return configs;
}