const localeCodes = {
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

const currencies = {
	us: 'USD',
	se: 'SEK',
	dk: 'DKK',
	uk: 'GBP',
	de: 'EUR',
	no: 'NOK',
	nl: 'EUR',
	fi: 'EUR',
	it: 'EUR',
	fr: 'EUR',
	jp: 'JPY',
	es: 'EUR',
	pt: 'EUR',
	pl: 'PLN',
};

export function getLocale(market: string): string {
	if (localeCodes[market]) {
		return localeCodes[market];
	}
	throw new Error(`No language code exists for lang: ${market}.`);
}

export function getCurrency(market: string): string {
	if (currencies[market]) {
		return currencies[market];
	}
	throw new Error(`No currency code exists for lang: ${market}.`);
}	