import { NamedConfig } from "../../data/NamedConfig";

export interface ServiceConfig extends NamedConfig {
	families?: string[];
	attributes?: string[];
	pricing_models?: string[];
}