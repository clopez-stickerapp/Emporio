import { describe, expect, test } from "vitest";
import { Currencies, CurrencyConverter, convertToMajorUnits, formatCurrency, getConversionRates, getDefaultDecimals, getMinorSymbol } from "../src/Commerce/Core/Currency/Currency";

describe("Test Currencies", () => {
	test("check if they all have conversion rates", () => {
		const conversionRates = getConversionRates();
		expect(Object.keys(conversionRates).sort()).toEqual(Object.values(Currencies).sort());
	});
});

describe("Test getDefaultDecimals", () => {
	test("with JPY", () => {
		expect(getDefaultDecimals(Currencies.JPY)).toBe(0);
	});

	test("with USD", () => {
		expect(getDefaultDecimals(Currencies.USD)).toBe(2);
	});

	test("with EUR", () => {
		expect(getDefaultDecimals(Currencies.EUR)).toBe(2);
	});

	test("with unsupported currency", () => {
		expect(getDefaultDecimals("XYZ")).toBe(2);
	});
});

describe("Test CurrencyConverter", () => {
	let conversionRates = getConversionRates();

	test("with same currency (USD to USD)", () => {
		const converter = new CurrencyConverter(conversionRates);

		expect(converter.convert(100, Currencies.USD, Currencies.USD)).toBe(100);
	});

	conversionRates[Currencies.EUR] = 100;

	test("with different currency (USD to EUR)", () => {
		const converter = new CurrencyConverter(conversionRates);

		expect(converter.convert(100, Currencies.USD, Currencies.EUR)).toBe(10000);
	});
	
	test("with different currency (EUR to USD)", () => {
		const converter = new CurrencyConverter(conversionRates);

		expect(converter.convert(10000, Currencies.EUR, Currencies.USD)).toBe(100);
	});
});

describe("Test formatCurrency", () => {
	describe("US dollars", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.USD, locale: "en-US" })).toBe("$100.00");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.USD, locale: "en-US", maxDecimals: 0 })).toBe("$100");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.USD, locale: "en-US", minorIfBelowOne: true })).toBe("99¢");
		});

		test("with minorIfBelowOne false", () => {
			expect(formatCurrency(0.99, { currency: Currencies.USD, locale: "en-US", minorIfBelowOne: false })).toBe("$0.99");
		});
	});

	describe("Japanese yen", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.JPY, locale: "ja-JP" })).toBe("￥100");
		});
	
		test("with maxDecimals set higher than allowed", () => {
			expect(formatCurrency(100, { currency: Currencies.JPY, locale: "ja-JP", maxDecimals: 2 })).toBe("￥100");
		});

		test("with minorIfBelowOne, which doesn't affect JPY", () => {
			expect(formatCurrency(0.99, { currency: Currencies.JPY, locale: "ja-JP", minorIfBelowOne: true })).toBe("￥1");
		});
		
		test("with a near zero value", () => {
			expect(formatCurrency(0.01, { currency: Currencies.JPY, locale: "ja-JP"})).toBe("￥1");
		});
	});

	describe("Swedish kronor", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.SEK, locale: "sv-SE" })).toBe("100,00\xa0kr");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.SEK, locale: "sv-SE", maxDecimals: 0 })).toBe("100\xa0kr");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.SEK, locale: "sv-SE", minorIfBelowOne: true })).toBe("99\xa0öre");
		});

		test("with minorIfBelowOne false", () => {
			expect(formatCurrency(0.99, { currency: Currencies.SEK, locale: "sv-SE", minorIfBelowOne: false })).toBe("0,99\xa0kr");
		});
	});

	describe("Polish złoty", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.PLN, locale: "pl-PL" })).toBe("100,00\xa0zł");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.PLN, locale: "pl-PL", maxDecimals: 0 })).toBe("100\xa0zł");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.PLN, locale: "pl-PL", minorIfBelowOne: true })).toBe("99\xa0gr");
		});
	});

	describe("Norwegian krone", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.NOK, locale: "nn-NO" })).toBe("100,00\xa0kr");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.NOK, locale: "nn-NO", maxDecimals: 0 })).toBe("100\xa0kr");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.NOK, locale: "nn-NO", minorIfBelowOne: true })).toBe("99\xa0øre");
		});
	});

	describe("Danish krone", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.DKK, locale: "da-DK" })).toBe("100,00\xa0kr.");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.DKK, locale: "da-DK", maxDecimals: 0 })).toBe("100\xa0kr.");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.DKK, locale: "da-DK", minorIfBelowOne: true })).toBe("99\xa0øre");
		});
	});

	describe("British pound", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.GBP, locale: "en-GB" })).toBe("£100.00");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.GBP, locale: "en-GB", maxDecimals: 0 })).toBe("£100");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.GBP, locale: "en-GB", minorIfBelowOne: true })).toBe("99p");
		});

		test("with minorIfBelowOne false", () => {
			expect(formatCurrency(0.99, { currency: Currencies.GBP, locale: "en-GB", minorIfBelowOne: false })).toBe("£0.99");
		});
	});

	describe("Euro, with German locale", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.EUR, locale: "de-DE" })).toBe("100,00\xa0€");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.EUR, locale: "de-DE", maxDecimals: 0 })).toBe("100\xa0€");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.EUR, locale: "de-DE", minorIfBelowOne: true })).toBe("0,99\xa0€");
		});
	});

	describe("Euro, with Dutch locale", () => {
		test("with default options", () => {
			expect(formatCurrency(100, { currency: Currencies.EUR, locale: "nl-NL" })).toBe("€\xa0100,00");
		});
	
		test("with custom options", () => {
			expect(formatCurrency(100, { currency: Currencies.EUR, locale: "nl-NL", maxDecimals: 0 })).toBe("€\xa0100");
		});
		
		test("with minorIfBelowOne", () => {
			expect(formatCurrency(0.99, { currency: Currencies.EUR, locale: "nl-NL", minorIfBelowOne: true })).toBe("€\xa00,99");
		});
	});
});

describe("Test getMinorSymbol", () => {
	test("with USD", () => {
		expect(getMinorSymbol(Currencies.USD)).toBe("¢");
	});

	test("with SEK", () => {
		expect(getMinorSymbol(Currencies.SEK)).toBe("\xa0öre");
	});

	test("with NOK", () => {
		expect(getMinorSymbol(Currencies.NOK)).toBe("\xa0øre");
	});

	test("with DKK", () => {
		expect(getMinorSymbol(Currencies.DKK)).toBe("\xa0øre");
	});

	test("with GBP", () => {
		expect(getMinorSymbol(Currencies.GBP)).toBe("p");
	});

	test("with PLN", () => {
		expect(getMinorSymbol(Currencies.PLN)).toBe("\xa0gr");
	});

	test("with unsupported currency", () => {
		expect(() => getMinorSymbol("XYZ")).toThrow();
	});

	test("with supported currency that doesn't have minor symbol", () => {
		expect(() => getMinorSymbol(Currencies.JPY)).toThrow();
	});
});

describe("Test convertToMajorUnits", () => {
	test("with USD", () => {
		expect(convertToMajorUnits(100, Currencies.USD)).toBe(1);
	});

	test("with JPY", () => {
		expect(convertToMajorUnits(100, Currencies.JPY)).toBe(100);
	});

	test("with SEK", () => {
		expect(convertToMajorUnits(100, Currencies.SEK)).toBe(1);
	});

	test("with NOK", () => {
		expect(convertToMajorUnits(100, Currencies.NOK)).toBe(1);
	});

	test("with DKK", () => {
		expect(convertToMajorUnits(100, Currencies.DKK)).toBe(1);
	});

	test("with GBP", () => {
		expect(convertToMajorUnits(100, Currencies.GBP)).toBe(1);
	});

	test("with PLN", () => {
		expect(convertToMajorUnits(100, Currencies.PLN)).toBe(1);
	});

	test("with EUR", () => {
		expect(convertToMajorUnits(100, Currencies.EUR)).toBe(1);
	});
});