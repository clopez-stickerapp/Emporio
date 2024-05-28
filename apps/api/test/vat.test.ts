import { describe, expect, test } from "vitest";
import { excludeVAT, getVatPercentage, isEuCountry, isEuropeanCountry, isExport } from "../src/Commerce/Tax/Vat";

describe("Test isExport", ()=>{
	test("with EU country", ()=>{
		expect(isExport("nl")).equal(false);
		expect(isExport("de")).equal(false);
		expect(isExport("fr")).equal(false);
	});

	test("with non-EU european country and not VAT registered", ()=>{
		expect(isExport("ch")).equal(true);
	});

	test("with non-EU country and VAT registered", ()=>{
		expect(isExport("no")).equal(false);
	});

	test("with sweden", ()=>{
		expect(isExport("se")).equal(false);
	});

	test("with non-european country", ()=>{
		expect(isExport("us")).equal(true);
		expect(isExport("jp")).equal(true);
	});
});

describe("Test isEuCountry", ()=>{
	test("with EU country", ()=>{
		expect(isEuCountry("nl")).equal(true);
		expect(isEuCountry("se")).equal(true);
		expect(isEuCountry("es")).equal(true);
	});

	test("with non-EU european country", ()=>{
		expect(isEuCountry("gb")).equal(false);
		expect(isEuCountry("us")).equal(false);
		expect(isEuCountry("jp")).equal(false);
	});
});

describe("Test isEuropeanCountry", ()=>{
	test("with EU country", ()=>{
		expect(isEuropeanCountry("nl")).equal(true);
		expect(isEuropeanCountry("se")).equal(true);
		expect(isEuropeanCountry("es")).equal(true);
	});

	test("with non-EU european country", ()=>{
		expect(isEuropeanCountry("gb")).equal(true);
		expect(isEuropeanCountry("no")).equal(true);
		expect(isEuropeanCountry("ch")).equal(true);
	});

	test("with non-european country", ()=>{
		expect(isEuropeanCountry("us")).equal(false);
		expect(isEuropeanCountry("jp")).equal(false);
	});
});

describe("Test getVatPercentage", ()=>{
	test("with only one argument", ()=>{
		expect(getVatPercentage("nl")).equal(21);
		expect(getVatPercentage("de")).equal(19);
		expect(getVatPercentage("fr")).equal(20);
	});

	test("with country that is export but shipping country isn't", ()=>{
		expect(getVatPercentage("us", "se")).equal(25);
		expect(getVatPercentage("ch", "se")).equal(25);
		expect(getVatPercentage("jp", "se")).equal(25);
	});

	test("with country that isn't export and shipping country that is", ()=>{
		expect(getVatPercentage("nl", "gb")).equal(20);
		expect(getVatPercentage("de", "jp")).equal(0);
		expect(getVatPercentage("fr", "us")).equal(0);
	});

	test("with country that isn't export and shipping country that isn't", ()=>{
		expect(getVatPercentage("nl", "de")).equal(19);
		expect(getVatPercentage("de", "nl")).equal(21);
		expect(getVatPercentage("fr", "nl")).equal(21);
	});

	test("with country that is VAT registered and valid VAT", ()=>{
		expect(getVatPercentage("no", null, true)).equal(25);
		expect(getVatPercentage("se", null, true)).equal(25);
	});

	test("with european country that isn't VAT registered and valid VAT", ()=>{
		expect(getVatPercentage("nl", null, true)).equal(0);
		expect(getVatPercentage("de", null, true)).equal(0);
	});

	test("with non-european country", ()=>{
		expect(getVatPercentage("us")).equal(0);
		expect(getVatPercentage("jp")).equal(0);
		expect(getVatPercentage("ch")).equal(0);
	});
});

describe("Test excludeVAT", ()=>{
	test("with 100 and 21", ()=>{
		expect(excludeVAT(100, 21)).equal(82.64462809917356);
	});

	test("with 100 and 19", ()=>{
		expect(excludeVAT(100, 19)).equal(84.03361344537815);
	});

	test("with 100 and 20", ()=>{
		expect(excludeVAT(100, 20)).equal(83.33333333333334);
	});
});