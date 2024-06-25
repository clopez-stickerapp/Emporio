export interface ProductSettings {
	general?: {
		pricing_model?: string;
		cutline?: string;
		material?: string;
		laminate?: string;
	};
	wizard?: {
		size?: string;
		quantity?: string;
	};
	editor?: {
		tools?: string;
	};
};