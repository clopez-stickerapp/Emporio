import { Price } from "$/prices/Price";

export enum Currencies{
	USD = "USD",
	SEK = "SEK",
	DKK = "DKK",
	GBP = "GBP",
	NOK = "NOK",
	EUR = "EUR",
	JPY = "JPY",
	PLN = "PLN",
}

export function getCurrencies(): string[] {
	return Object.values(Currencies);
}

const conversionRates: ConversionRates = {
	[Currencies.USD]: 1,
    [Currencies.SEK]: 9.897,
    [Currencies.DKK]: 8.253,
    [Currencies.GBP]: 0.793,
    [Currencies.NOK]: 9.002,
    [Currencies.EUR]: 1.103,
    [Currencies.JPY]: 1.50537,
    [Currencies.PLN]: 4.050,
}

export function getConversionRates(): ConversionRates {
	return conversionRates;
}

export function getDefaultDecimals(currency: string): number {
	switch (currency) {
		case Currencies.JPY:
			return 0;
		default:
			return 2;
	}
}

export type ConversionRates = { [currency in Currencies]: number };

export class CurrencyConverter {
	constructor(private readonly conversionRates: ConversionRates = getConversionRates()) { }

	public convert(amount: number, from: Currencies, to: Currencies): number {
		if (from === to) {
			return amount;
		}

		const fromRate = this.conversionRates[from];
		const toRate = this.conversionRates[to];

		return parseFloat((amount * toRate / fromRate).toFixed(10));
	}

	public convertPrice(price: Price, to: Currencies): Price {
		if (price.currency === to) {
			return price;
		}
	
		const total = this.convert(price.total, price.currency, to);

		if (!price.breakdown) {
			return {
				total,
				currency: to
			};
		}

		const breakdown: Record<string, number> = {};
	
		for (const [currency, amount] of Object.entries(price.breakdown)) {
			breakdown[currency] = this.convert(amount, price.currency, to);
		}
	
		return {
			total,
			breakdown,
			currency: to
		}
	}
}

/**
 * Formats a currency amount to a string
 * 
 * @param amount - The amount to format.
 * @param options - Formatting options.
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, options: FormatCurrencyOptions): string {
	const { currency, locale, minorIfBelowOne } = options;
	let decimals = options.maxDecimals ?? getDefaultDecimals(currency);

	if (amount != 0 && amount < 1 && minorIfBelowOne) {
		try{
			return Math.round(amount * 100) + getMinorSymbol(currency);
		} catch (e) {}
	}

	// For non-zero amounts less than 1, we want to show 2 decimals,
	// otherwise it will get rounded down to 0.
	if (amount != 0 && amount < 1) {
		if(decimals == 0 || getDefaultDecimals(currency) == 0) {
			amount = 1;
		} else {
			decimals = 2;
		}
	}

	// This function ignores decimals automatically for JPY
	let nf = new Intl.NumberFormat(locale, { style: 'currency', currency: currency, maximumFractionDigits: decimals });
	return nf.format(amount);
}

/**
 * Returns the minor symbol for a currency
 * **including** a preceding non-breaking space if applicable
 */
export function getMinorSymbol(currency: string): string {
	switch (currency) {
		case Currencies.SEK:
			return "\xa0öre";
		case Currencies.NOK:
		case Currencies.DKK:
			return "\xa0øre";
		case Currencies.GBP:
			return "p";
		case Currencies.PLN:
			return "\xa0gr";
		case Currencies.USD:
			return "¢";
		default:
			throw new Error(`No minor symbol for currency: ${currency}`);
	}
}

/**
 * Options for formatting currency.
 * 
 * @property currency - The currency code.
 * @property [locale] - The locale to use for formatting.
 * @property [decimals] - The number of decimal places to display. Overridden if the amount is below 1 and minorIfBelowOne is not true.
 * @property [minorIfBelowOne] - Whether to display minor units if the amount is below 1. This is ignored if the currency doesn't have minor units.
 */
export type FormatCurrencyOptions = {
	currency: Currencies;
	locale?: string;
	maxDecimals?: number;
	minorIfBelowOne?: boolean;
};

export function convertToMajorUnits(amount: number, currency: Currencies): number {
	return amount / (10 ** getDefaultDecimals(currency));
}
