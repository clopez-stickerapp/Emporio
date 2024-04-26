import { describe, expect, test } from "vitest";
import { RateProviderType, RateProvider } from "../src/Commerce/Core/Price/RateProvider";
import { Rate } from "../src/Commerce/Core/Price/Rate";
import { ProductItem } from "../src/Commerce/Core/Product/Item/ProductItem";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";
class ProviderTest extends RateProvider {
	public getRate(productItem: ProductItem): Rate {
		return new Rate(productItem.getAttribute("test-attribute") as number * 2);
	}
	constructor(name: string) {
		super(name);
	}
}

let provider: RateProvider;
let item: ProductItem;

describe("Test creating RateProvider", () => {
	test("with valid params", () => {
		provider = new ProviderTest("test");
		expect(provider).toBeInstanceOf(RateProvider);
	});

	test("getting name", () => {
		provider = new ProviderTest("slightly-longer-test-name with spaces");
		expect(provider.getName()).toBe("slightly-longer-test-name with spaces");
	});

	test("changing type", () => {
		provider = new ProviderTest("test");
		provider.setType(RateProviderType.ADDON);
		expect(provider.getType()).toBe(RateProviderType.ADDON);
	});
});

describe("Test test function", () => {
	test("with applicable condition", () => {
		provider = new ProviderTest("test");
		provider.conditions.addCondition("item.attributes.test-attribute", ConditionOperators.GREATER_THAN, 0);

		item = new ProductItem("foo", "bar");
		item.setAttribute("test-attribute", 5);

		expect(provider.test(item)).toBe(true);
	});

	test("with inapplicable condition", () => {
		provider = new ProviderTest("test");
		provider.conditions.addCondition("item.attributes.test-attribute", ConditionOperators.GREATER_THAN, 0);

		item = new ProductItem("foo", "bar");
		item.setAttribute("test-attribute", 0);

		expect(provider.test(item)).toBe(false);
	});
});


test("Test getRate function", () => {
	provider = new ProviderTest("test");

	item = new ProductItem("foo", "bar");
	item.setAttribute("test-attribute", 5);

	expect(provider.getRate(item, 0).getValue()).toBe(10);
});
