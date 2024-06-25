import { AttributeValue } from "$/product/attribute/AttributeValue";
import { NamedConfig } from "../../data/NamedConfig";
import { ProductSettings } from "./ProductSettings";

export interface ProductConfig extends NamedConfig{
	sku: string,
	attributes?: {
		[key: string]: AttributeValue;
	},
	// icons?: {
	// 	default?: string;
	// };
	overrides?: ProductSettings;
};