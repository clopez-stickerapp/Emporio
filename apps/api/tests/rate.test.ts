import { describe, expect, test } from "vitest";
import { Rate, RateType } from "../src/Commerce/Core/Price/Rate";

let rate: Rate;

describe("Test constructor", () => {
	test("flat rate with valid params", () => {
		rate = new Rate(10);
		expect(rate.getValue()).toBe(10);
		expect(rate.isPercentage()).toBe(false);
		expect(rate.getMinValue()).toBe(0);
		expect(rate.getType()).toBe(RateType.ADDITIVE);
	});

	test("percentage with valid params", () => {
		rate = new Rate(10, true, 5);
		expect(rate.getValue()).toBe(10/100);
		expect(rate.isPercentage()).toBe(true);
		expect(rate.getMinValue()).toBe(5);
	});

	test("with invalid params", () => {
		expect(() => new Rate(0, false, 10)).toThrow( Error );
	});
});

describe("Test threshold", () => {
	test("with valid params", () => {
		rate = new Rate(10, true, 5);
		rate.setUnitThreshold(25);
		expect(rate.getUnitThreshold()).toBe(25);
	});

	test("without explicitly setting it", () => {
		rate = new Rate(10, true, 5);
		expect(rate.getUnitThreshold()).toBe(0);
	});
});