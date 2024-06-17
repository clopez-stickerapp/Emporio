import { Currencies, formatCurrency } from "$/currency/Currency";
import { getLocale } from "$/localization/Locale";
import { excludeVAT } from "$/tax/Vat";
import { Static, Type } from "@sinclair/typebox";

export const Price = Type.Object({
	total: Type.Number(),
	breakdown: Type.Optional(Type.Record(Type.String(), Type.Number())),
	currency: Type.Enum(Currencies)
});
export type Price = Static<typeof Price>;

export const FormattedPrice = Type.Composite([Price, Type.Object({
	totalFormatted: Type.String(),
	breakdownFormatted: Type.Optional(Type.Record(Type.String(), Type.String())),
})]);
export type FormattedPrice = Static<typeof FormattedPrice>;

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

export function formatPrice(price: Price, lang: string, maxDecimals: number): FormattedPrice{
	let locale = getLocale(lang);

	let breakdown: Record<string, number> = {};
	let breakdownFormatted: Record<string, string> = {};

	let result = {
		total: parseFloat(price.total.toFixed(maxDecimals)),
		breakdown,
		totalFormatted: formatCurrency(price.total, { currency: price.currency, locale, maxDecimals }),
		breakdownFormatted,
		currency: price.currency
	} 

	for (const [key, value] of Object.entries(price.breakdown ?? {})) {
		result.breakdown[key] = parseFloat(value.toFixed(maxDecimals));
		result.breakdownFormatted[key] = formatCurrency(value, { currency: price.currency, locale, maxDecimals });
	}

	return result;
}

export function bundlePrice(price: Price, options: { baseName: string, separate: { [key:string]: string } }): Price {
	// For every item in the breakdown that is not in separate, sum it up to the base
	// The base price and everything separate are the only things that should be in the breakdown

	let breakdown: Record<string, number> = {};
	let base = 0;

	for (let [key, value] of Object.entries(price.breakdown ?? {})) {
		if (options.separate[key]) {
			breakdown[options.separate[key]] = value;
		} else {
			base += value;
		}
	}

	breakdown[options.baseName] = base;

	return {
		total: price.total,
		breakdown,
		currency: price.currency
	}
}