/**
* This service handles everything related to VAT.
* 
* Here's some information about VAT and how it works. Compiled with the help of Josefin.
* 
* Something is considered an export if we send goods outside the EU, and we are not VAT (Value Added Tax) registered in that country. For example:
* - Norway, United Kingdom and Switzerland are not considered exports (it's outside the EU, but we are VAT registered).
* - Sweden is not considered an export because we are located in Sweden.
* - For example, the Netherlands (NL), Germany (DE), France (FR) are not considered exports (since they are within the EU).
* 
* Export means that we do not charge VAT. Companies in EU countries can make a VAT chargeback if their VAT number is valid, which means we do not charge them any VAT.
* Companies without valid VAT numbers aren’t eligible for a reverse charge and should therefore be charged as individuals.
* 
* On invoices to the United Kingdom, our British VAT number should be displayed.
* On invoices to Norway, our Norwegian VAT number should be stated.
* On invoices to any other EU country (including Sweden), our Swedish VAT number should be mentioned.
* On export invoices, our Swedish VAT number should be mentioned.
*/

const vatRegisteredCountries: string[] = ["se", "gb", "no", "ch"];

const euCountries: string[] = [
	'se', 'be', 'bg', 'cy', 'dk', 'ee', 'fi', 'fr', 'gr',
	'ie', 'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt',
	'ro', 'sk', 'si', 'es', 'cz', 'de', 'hu', 'at', 'hr',
];

const europeanCountries: string[] = [...euCountries, 'gb', 'no', 'ch'];

// Greece's VAT prefix is EL instead of GR
const vatRates: Record<string, number> = {
	"at": 20, // Austria
	"be": 21, // Belgium
	"bg": 20, // Bulgaria
	"cy": 19, // Cyprus
	"cz": 21, // Czech Republic
	"de": 19, // Germany
	"dk": 25, // Denmark
	"ee": 22, // Estonia
	"es": 21, // Spain
	"fi": 24, // Finland
	"fr": 20, // France
	"gb": 20, // United Kingdom
	"gr": 24, // Greece
	"hr": 25, // Croatia
	"hu": 27, // Hungary
	"ie": 23, // Ireland
	"it": 22, // Italy
	"lt": 21, // Lithuania
	"lu": 17, // Luxembourg
	"lv": 21, // Latvia
	"mt": 18, // Malta
	"nl": 21, // Netherlands
	"pl": 23, // Poland
	"pt": 23, // Portugal
	"ro": 19, // Romania
	"se": 25, // Sweden
	"si": 22, // Slovenia
	"sk": 20, // Slovakia
	"no": 25, // Norway
	"ch": 8.1,// Switzerland
};

export function isExport(countryCode: string): boolean {
	if (isEuCountry(countryCode) || isVatRegistered(countryCode)) {
		return false;
	}
	return true;
}

export function isEuCountry(countryCode: string): boolean {
	return euCountries.includes(countryCode);
}

export function isEuropeanCountry(countryCode: string): boolean {
	return europeanCountries.includes(countryCode);
}

export function isVatRegistered(countryCode: string): boolean {
	return vatRegisteredCountries.includes(countryCode);
}

export function getVatRate(countryCode: string): number {
	if (!vatRates[countryCode]) {
		throw new Error("No VAT rate found for country code: " + countryCode);
	}

	return vatRates[countryCode];
}

/**
 * This country returns the correct VAT percentage based on the country code.
 * 
 * @param billingCountry What the name says
 * @param shippingCountry Only needs to be filled in if the shipping country is different from the billing country
 * @param hasValidVATNumber 
 * @returns 
 */
export function getVatPercentage(billingCountry: string, shippingCountry: string|null = null, hasValidVATNumber: boolean = false): number {
	if(!shippingCountry) {
		shippingCountry = billingCountry;
	}

	if (isExport(billingCountry) && !isExport(shippingCountry)) {
		shippingCountry = "se";
	}

	const isExportOrNotVatRegisteredWithValidVATNumber = isExport(shippingCountry) || (!isVatRegistered(shippingCountry) && hasValidVATNumber);

	if (isExportOrNotVatRegisteredWithValidVATNumber) {
		return 0;
	}

	return getVatRate(shippingCountry);
}

export function excludeVAT(price: number, vatPercentage: number): number {
	return price / (1 + vatPercentage / 100);
}