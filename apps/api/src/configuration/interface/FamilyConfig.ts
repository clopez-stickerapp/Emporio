import { NamedConfig } from "../../data/NamedConfig";
import { ProductSettings } from "./ProductSettings";

export interface FamilyConfig extends NamedConfig {
	products: string[];
	unitType: string;
	rules: {
		attributes?: {
			required?: string[];
			optional?: string[];
		};
		collections: {
			constraint: string;
			filter: string;
			// icon: string;
			min_units: string;
			price_provider: string;
			quantity_provider: string;
			asset: string;
		}
	template?: string;
		// production?: {
		// 	web?: {
		// 		direction?: string;
		// 	},
		// 	delivery?: {
		// 		type?: string;
		// 		padding_mm?: number;
		// 		padding_outside_mm?: number;
		// 		width_mm?: number;
		// 		height_mm?: number;
		// 	};
		// };
	}
	settings?: ProductSettings;
};
