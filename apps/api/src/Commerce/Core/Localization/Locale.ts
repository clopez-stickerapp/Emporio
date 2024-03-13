import { Currencies } from "../Currency/Currency";

const localeCodes: Record<string, string> = {
	us: 'en-US',
	se: 'sv-SE',
	dk: 'da-DK',
	uk: 'en-GB',
	de: 'de-DE',
	no: 'nn-NO',
	nl: 'nl-NL',
	fi: 'fi-FI',
	it: 'it-IT',
	fr: 'fr-FR',
	jp: 'ja-JP',
	es: 'es-ES',
	pt: 'pt-PT',
	pl: 'pl-PL',
};

const currencies: Record<string, Currencies> = {
	us: Currencies.USD,
	se: Currencies.SEK,
	dk: Currencies.DKK,
	uk: Currencies.GBP,
	de: Currencies.EUR,
	no: Currencies.NOK,
	nl: Currencies.EUR,
	fi: Currencies.EUR,
	it: Currencies.EUR,
	fr: Currencies.EUR,
	jp: Currencies.JPY,
	es: Currencies.EUR,
	pt: Currencies.EUR,
	pl: Currencies.PLN,
};

export function getLocale(market: string): string {
	if (localeCodes[market]) {
		return localeCodes[market];
	}
	throw new Error(`No language code exists for lang: ${market}.`);
}

export function getCurrency(market: string): Currencies {
	if (currencies[market]) {
		return currencies[market];
	}
	throw new Error(`No currency code exists for lang: ${market}.`);
}	