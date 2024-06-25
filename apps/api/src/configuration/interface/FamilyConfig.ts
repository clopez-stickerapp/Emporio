import { NamedConfig } from "../../data/NamedConfig";
import { ProductSettings } from "./ProductSettings";

export interface FamilyConfig extends NamedConfig {
	products: string[];
	rules?: {
		attributes?: {
			required?: string[];
			optional?: string[];
		};
		production?: {
			web?: {
				direction?: string;
			},
			delivery?: {
				type?: string;
				padding_mm?: number;
				padding_outside_mm?: number;
				width_mm?: number;
				height_mm?: number;
			};
		};
	}
	settings?: ProductSettings;
};
