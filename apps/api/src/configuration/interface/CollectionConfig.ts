import { NamedConfig } from "$data/NamedConfig";

export enum CollectionType {
	Filter = "filter",
	Constraint = "constraint",
	Asset = "asset"
}

export interface CollectionConfig extends NamedConfig {
	type: CollectionType;
	values: string[]
};