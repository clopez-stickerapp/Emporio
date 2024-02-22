import { Currencies } from "../Currency/Currency";

export interface Price{
	total: number;
	breakdown?: Record<string, number>;
	currency: Currencies
}