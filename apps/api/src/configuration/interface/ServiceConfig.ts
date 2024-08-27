import { NamedConfig } from "../../data/NamedConfig";
import { CollectionType } from "./CollectionConfig";

export interface ServiceConfig extends NamedConfig {
	families?: string[];
	attributes?: string[];
	pricing_models?: string[];
	collections: Record<CollectionType, string[]>;
}