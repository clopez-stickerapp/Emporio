import { describe, expect, test } from "vitest";
import { RateList } from "../src/Commerce/Core/Price/RateList";
import { Rate } from "../src/Commerce/Core/Price/Rate";

let rateList: RateList;
let rate: Rate;

describe("Test constructor", () => {
	test("with default rate", () => {
		rateList = new RateList("test", new Rate(0));
		expect(rateList).instanceOf(RateList);
	});

	test("without default rate", () => {
		rateList = new RateList("test");
		expect(rateList).instanceOf(RateList);
	});
});

describe("Test addRate", () => {
	test("with positive threshold", () => {
		rateList = new RateList("test");
		rateList.addRate(new Rate(10), 10);
		expect(rateList.getRates()).lengthOf(1);
	});

	test("with negative threshold", () => {
		rateList = new RateList("test");
		rateList.addRate(new Rate(10), -10);
		expect(rateList.getRates()).lengthOf(1);
	});

	test("with zero threshold", () => {
		rateList = new RateList("test");
		rateList.addRate(new Rate(10), 0);
		expect(rateList.getRates()).lengthOf(1);
	});

	test("with multiple rates", () => {
		rateList = new RateList("test");
		rateList.addRate(new Rate(10), 10);
		rateList.addRate(new Rate(20), 20);
		expect(rateList.getRates()).lengthOf(2);
	});
});

describe("Test getRate", () => {
	test("with no rates", () => {
		rateList = new RateList("test");

		rate = rateList.getRate(0);
		expect(rate).instanceOf(Rate);
		expect(rate.getValue()).equal(0);
	});

	test("with default rate set to 5", () => {
		rateList = new RateList("test", new Rate(5));

		rate = rateList.getRate(0);
		expect(rate).instanceOf(Rate);
		expect(rate.getValue()).equal(5);
	});

	test("with rates", () => {
		rateList = new RateList("test");
		rateList.addRate(new Rate(20), 20);
		rateList.addRate(new Rate(10), 10);

		rate = rateList.getRate(0);
		expect(rate.getValue()).equal(0);

		rate = rateList.getRate(5);
		expect(rate.getValue()).equal(0);

		rate = rateList.getRate(9.99);
		expect(rate.getValue()).equal(0);

		rate = rateList.getRate(10);
		expect(rate.getValue()).equal(10);

		rate = rateList.getRate(10.01);
		expect(rate.getValue()).equal(10);

		rate = rateList.getRate(15);
		expect(rate.getValue()).equal(10);

		rate = rateList.getRate(19.99);
		expect(rate.getValue()).equal(10);

		rate = rateList.getRate(20);
		expect(rate.getValue()).equal(20);

		rate = rateList.getRate(20.01);
		expect(rate.getValue()).equal(20);

		rate = rateList.getRate(100);
		expect(rate.getValue()).equal(20);
	});
});

test("Test sortByThreshold", () => {
	rateList = new RateList("test");
	rateList.addRate(new Rate(20), 20);
	rateList.addRate(new Rate(10), 10);
	rateList.addRate(new Rate(30), 30);
	rateList.addRate(new Rate(0), 150);
	rateList.addRate(new Rate(40), 40);

	RateList.sortByThreshold(rateList.getRates());

	let rates = rateList.getRates();

	expect(rates[0].getUnitThreshold()).equal(150);
	expect(rates[1].getUnitThreshold()).equal(40);
	expect(rates[2].getUnitThreshold()).equal(30);
	expect(rates[3].getUnitThreshold()).equal(20);
	expect(rates[4].getUnitThreshold()).equal(10);
});