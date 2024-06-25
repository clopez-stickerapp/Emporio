import { NamedConfig } from "../../data/NamedConfig";
import { ProductSettings } from "./ProductSettings";

export interface ProductConfig extends NamedConfig{
	icons?: {
		default?: string;
	};
	overrides?: ProductSettings;
};