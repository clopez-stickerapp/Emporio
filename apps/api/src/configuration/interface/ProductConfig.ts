import { ConditionValue } from "$/conditions/ConditionValue";
import { NamedConfig } from "../../data/NamedConfig";
import { ProductSettings } from "./ProductSettings";

export interface ProductConfig extends NamedConfig{
	sku: string;
	attributes?: Record<string, ConditionValue>;
	overrides?: ProductSettings;
	available: boolean;
	status?: string;
};