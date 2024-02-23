import { Currencies } from "../Currency/Currency";

export interface Price{
	total: number;
	breakdown?: Record<string, number>;
	currency: Currencies
}

export function calculateBreakdownSum(breakdown: Record<string, number>){
	return Object.values(breakdown).reduce((a, b) => a + b, 0);
}