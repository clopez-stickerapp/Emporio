import { excludeVAT } from "../../Tax/Vat";
import { Currencies, formatCurrency } from "../Currency/Currency";
import { getLocale } from "../Localization/Locale";

export interface Price{
	total: number;
	breakdown?: Record<string, number>;
	currency: Currencies
}

export function calculateBreakdownSum(breakdown: Record<string, number>){
	return Object.values(breakdown).reduce((a, b) => a + b, 0);
}

export function excludeVATFromPrice(price: Price, vatPercentage: number): Price {
	//remove vat percentage from total and breakdown
	let total = excludeVAT(price.total, vatPercentage);
	let breakdown: Record<string,number> = {};

	for (let [key, value] of Object.entries(price.breakdown ?? {})) {
		breakdown[key] = excludeVAT(value, vatPercentage);
	}

	return{
		total,
		breakdown,
		currency: price.currency
	}
}

export function toMajorUnits(price: Price): Price {
	//convert to major units
	let total = price.total / 100;
	let breakdown: Record<string, number> = {};

	for (let [key, value] of Object.entries(price.breakdown ?? {})) {
		breakdown[key] = value / 100;
	}

	return{
		total,
		breakdown,
		currency: price.currency
	}
}

export function formatPrice(price: Price, lang: string, maxDecimals: number): Record<string, any>{
	let locale = getLocale(lang);

	let breakdown: Record<string, string> = {};
	let breakdownFormatted: Record<string, string> = {};

	let result = {
		total: price.total.toFixed(maxDecimals),
		breakdown,
		totalFormatted: formatCurrency(price.total, { currency: price.currency, locale, maxDecimals }),
		breakdownFormatted,
		currency: price.currency
	}

	for (const [key, value] of Object.entries(price.breakdown ?? {})) {
		result.breakdown[key] = value.toFixed(maxDecimals);
		result.breakdownFormatted[key] = formatCurrency(value, { currency: price.currency, locale, maxDecimals });
	}

	return result;
}