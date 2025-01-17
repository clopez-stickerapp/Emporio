import { ConditionOperators } from "$/conditions/ConditionOperators";
import { Currencies } from "$/currency/Currency";
import { calculateBreakdownSum } from "$/prices/Price";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { Rate } from "$/prices/Rate";
import { RateBasedProductPriceProvider } from "$/prices/RateBasedProductPriceProvider";
import { RateProvider } from "$/prices/RateProvider";
import { ProductItem } from "@stickerapp-org/nomisma";
import { beforeEach, describe, expect, test } from "vitest";

describe("calculateBreakdownSum", () => {
	test("should be able to calculate the sum of a breakdown", () => {
		const breakdown = { test: 25, another: 25 };
		const sum = calculateBreakdownSum(breakdown);
		expect(sum).toBe(50);
	});
});

describe("RateBasedProductPriceProvider", () => {
	class RateProviderTest extends RateProvider {
		public async getRate(item: ProductItem, units: number): Promise<Rate> {
			return new Rate(units);
		}
	}

	class RateBasedProductPriceProviderExtension extends RateBasedProductPriceProvider {
		// getBreakdownFor is protected, so we need to extend the class to test it
		public getBreakdownFor(rates: Record<string, Rate>, units: number): Record<string, number> {
			return super.getBreakdownFor(rates, units);
		}
	}

	let rateProvider: RateProvider;
	let anotherRateProvider: RateProvider;

	let provider: RateBasedProductPriceProviderExtension;

	beforeEach(() => {
		rateProvider = new RateProviderTest("test");
		anotherRateProvider = new RateProviderTest("another");
		provider = new RateBasedProductPriceProviderExtension("test");
	});

	test("should be able to be instanced", () => {
		expect(provider).toBeInstanceOf(ProductPriceProvider);
		expect(provider.getName()).toBe("test");
	});

	test("should be able to add rate providers", () => {
		provider.addRateProvider(rateProvider);
		expect(provider.getRateProviders()[rateProvider.getName()]).toBe(rateProvider);
		expect(Object.values(provider.getRateProviders())).toHaveLength(1);

		provider.addRateProvider(anotherRateProvider);
		expect(provider.getRateProviders()[anotherRateProvider.getName()]).toBe(anotherRateProvider);
		expect(Object.values(provider.getRateProviders())).toHaveLength(2);
	});

	test("should be able to get rate providers for items", () => {
		const item = new ProductItem("family", "product");
		item.setAttribute("foo", "bar");

		rateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "baz"});
		provider.addRateProvider(rateProvider);

		anotherRateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "bar"});
		provider.addRateProvider(anotherRateProvider);

		const providers = provider.getRateProvidersFor(item);
		expect(providers).toHaveLength(1);
		expect(providers[0]).toBe(anotherRateProvider);
	});

	test("should be able to get applicable rates for product item", async () => {
		const item = new ProductItem("family", "product");
		item.setAttribute("foo", "bar");

		rateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "bar"});
		provider.addRateProvider(rateProvider);

		anotherRateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "baz"});
		provider.addRateProvider(anotherRateProvider);

		const rates = await provider.getRatesFor(item, 25);
		expect(rates).toEqual({ test: new Rate(25)});
	});

	test("should be able to get the separate prices from applicable rates", () => {
		let rate1 = new Rate(25);
		let rate2 = new Rate(37);

		const price = provider.getBreakdownFor({ test: rate1, another: rate2}, 25);
		expect(price).toEqual({ test: 25*25, another: 37*25 });
	});

	describe("should be able to get a price for a product item", () => {
		test("without attributes on the product item", async () => {
			const item = new ProductItem("family", "product");

			rateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.NOT_EQUAL, value: "baz"});
			provider.addRateProvider(rateProvider);
	
			anotherRateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.NOT_EQUAL, value: "bar"});
			provider.addRateProvider(anotherRateProvider);
	
			const price = await provider.calculatePrice(item, 25, Currencies.USD);
			expect(price.total).toBe((25+25)*25);
		});

		test("with attributes on the product item", async () => {
			const item = new ProductItem("family", "product");
			item.setAttribute("foo", "bar");

			rateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "baz"});
			provider.addRateProvider(rateProvider);
	
			anotherRateProvider.conditions.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "bar"});
			provider.addRateProvider(anotherRateProvider);
	
			const price = await provider.calculatePrice(item, 25, Currencies.USD);
			expect(price.total).toBe(25*25);
		});
		
	});
});