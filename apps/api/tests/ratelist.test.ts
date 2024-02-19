import { describe, expect, test } from "vitest";
import { RateList } from "../src/Commerce/Core/Price/RateList";
import { Rate } from "../src/Commerce/Core/Price/Rate";
import { ProductItem } from "../src/Commerce/Core/Product/Item/ProductItem";

let rateList: RateList;
let rate: Rate;
let item: ProductItem;

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
		item = new ProductItem("foo", "bar");

		rate = rateList.getRate(item);
		expect(rate).instanceOf(Rate);
		expect(rate.getValue()).equal(0);
	});

	test("with default rate set to 5", () => {
		rateList = new RateList("test", new Rate(5));
		item = new ProductItem("foo", "bar");

		rate = rateList.getRate(item);
		expect(rate).instanceOf(Rate);
		expect(rate.getValue()).equal(5);
	});

	test("with rates", () => {
		rateList = new RateList("test");
		rateList.addRate(new Rate(20), 20);
		rateList.addRate(new Rate(10), 10);

		item = new ProductItem("foo", "bar");

		item.setUnits(0);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(0);

		item.setUnits(5);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(0);

		item.setUnits(9.99);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(0);

		item.setUnits(10);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(10);

		item.setUnits(10.01);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(10);

		item.setUnits(15);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(10);

		item.setUnits(19.99);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(10);

		item.setUnits(20);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(20);

		item.setUnits(20.01);
		rate = rateList.getRate(item);
		expect(rate.getValue()).equal(20);

		item.setUnits(100);
		rate = rateList.getRate(item);
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