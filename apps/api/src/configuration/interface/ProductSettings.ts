export interface ProductSettings {
	general?: {
		pricing_model?: string;
	};
	wizard?: {
		size?: string;
		quantity?: string;
	};
	editor?: {
		tools?: string;
	};
};