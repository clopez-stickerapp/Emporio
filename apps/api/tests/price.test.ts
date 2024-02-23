import { beforeEach, describe, expect, test } from "vitest";
import { ProductPriceProvider } from "../src/Commerce/Core/Price/ProductPriceProvider";
import { ProductItem } from "../src/Commerce/Core/Product/Item/ProductItem";
import { Currencies } from "../src/Commerce/Core/Currency/Currency";
import { calculateBreakdownSum } from "../src/Commerce/Core/Price/Price";
import { RateBasedProductPriceProvider } from "../src/Commerce/Core/Price/RateBasedProductPriceProvider";
import { RateProvider } from "../src/Commerce/Core/Price/RateProvider";
import { Rate } from "../src/Commerce/Core/Price/Rate";

describe("calculateBreakdownSum", () => {
	test("should be able to calculate the sum of a breakdown", () => {
		const breakdown = { test: 25, another: 25 };
		const sum = calculateBreakdownSum(breakdown);
		expect(sum).toBe(50);
	});
});

describe("RateBasedProductPriceProvider", () => {
	class RateProviderTest extends RateProvider {
		public getRate(units: number): Rate {
			return new Rate(units);
		}
	}

	class RateBasedProductPriceProviderExtension extends RateBasedProductPriceProvider {
		// getPriceFor is protected, so we need to extend the class to test it
		public getPriceFor(providers: RateProvider[], units: number): Record<string, number> {
			return super.getPriceFor(providers, units);
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

		rateProvider.conditions.addCondition("item.attributes.foo", "==", "baz");
		provider.addRateProvider(rateProvider);

		anotherRateProvider.conditions.addCondition("item.attributes.foo", "==", "bar");
		provider.addRateProvider(anotherRateProvider);

		const providers = provider.getRateProvidersFor(item);
		expect(providers).toHaveLength(1);
		expect(providers[0]).toBe(anotherRateProvider);
	});

	test("should be able to get the separate prices from rate providers", () => {
		rateProvider.conditions.addCondition("item.attributes.foo", "==", "baz");
		provider.addRateProvider(rateProvider);

		anotherRateProvider.conditions.addCondition("item.attributes.foo", "==", "bar");
		provider.addRateProvider(anotherRateProvider);

		const price = provider.getPriceFor([rateProvider, anotherRateProvider], 25);
		expect(price).toEqual({ test: 25, another: 25 });
	});

	describe("should be able to get a price for a product item", () => {
		test("without attributes on the product item", () => {
			const item = new ProductItem("family", "product");

			rateProvider.conditions.addCondition("item.attributes.foo", "!=", "baz");
			provider.addRateProvider(rateProvider);
	
			anotherRateProvider.conditions.addCondition("item.attributes.foo", "!=", "bar");
			provider.addRateProvider(anotherRateProvider);
	
			const price = provider.calculatePrice(item, 25, Currencies.USD);
			expect(price.total).toBe(50);
		});

		test("with attributes on the product item", () => {
			const item = new ProductItem("family", "product");
			item.setAttribute("foo", "bar");

			rateProvider.conditions.addCondition("item.attributes.foo", "==", "baz");
			provider.addRateProvider(rateProvider);
	
			anotherRateProvider.conditions.addCondition("item.attributes.foo", "==", "bar");
			provider.addRateProvider(anotherRateProvider);
	
			const price = provider.calculatePrice(item, 25, Currencies.USD);
			expect(price.total).toBe(25);
		});
		
	});
});