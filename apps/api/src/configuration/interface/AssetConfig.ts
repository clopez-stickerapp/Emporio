import { NamedConfig } from "$data/NamedConfig";

export interface AssetConfig extends NamedConfig {
	values: Record<string, {
		images?: Record<string, string> 
		available?: boolean
	}>
};
