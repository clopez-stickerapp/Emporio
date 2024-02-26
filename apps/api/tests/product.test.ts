import { beforeEach, describe, expect, test } from "vitest";
import { ProductDynamicValue } from "../src/Commerce/Core/Product/Value/ProductDynamicValue";
import { ProductItem } from "../src/Commerce/Core/Product/Item/ProductItem";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";

let value: ProductDynamicValue;
let item: ProductItem;

describe("ProductDynamicValue", () => {
	beforeEach(() => {
		value = new ProductDynamicValue(10);
		item = new ProductItem("foo", "bar");
	});

	describe("getValue", () => {
		test("should return the default value", () => {
			expect(value.getValue(item)).toBe(10);
		});

		test("should return the default value if no conditioned value matches", () => {
			value.addConditionedValue(20).conditionBuilder.addCondition("foo", ConditionOperators.EQUAL, "bar");
			expect(value.getValue(item)).toBe(10);
		});

		test("should return the conditioned value if the condition matches", () => {
			value.addConditionedValue(20).conditionBuilder.addCondition("item.attributes.foo", ConditionOperators.EQUAL, "bar");
			item.setAttribute("foo", "bar");
			expect(value.getValue(item)).toBe(20);
		});

		test("should return the last added condition if complexity score is equal", () => {
			value.addConditionedValue(20);
			value.addConditionedValue(30);
			item.setAttribute("foo", "bar");
			expect(value.getValue(item)).toBe(30);
		});

		test("should return the highest complexity score if multiple values match", () => {
			value.addConditionedValue(20).conditionBuilder.addCondition("item.attributes.foo", ConditionOperators.EQUAL, "bar");
			value.addConditionedValue(30);
			item.setAttribute("foo", "bar");
			expect(value.getValue(item)).toBe(20);
		});
	});
});

class DummyFamily extends ProductFamily {}
class DummyProvider extends ProductPriceProvider {
	public calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Price {
		throw new Error("Method not implemented.");
	}
}
let service: ProductService;

describe("ProductService", () => {
	beforeEach(() => {
		service = new ProductService();
	});

	test("attrFilterCollection", () => {
		expect(() => service.retrieveAttrFilterCollection("foo")).toThrowError(Error);
	
		service.registerAttrFilterCollection(new ProductAttrFilterCollection("foo"));
		
		expect(service.retrieveAttrFilterCollection("foo")).toBeDefined();
	});

	test("attrIconCollection", () => {
		expect(() => service.retrieveAttrIconCollection("foo")).toThrowError(Error);
	
		service.registerAttrIconCollection(new ProductAttrIconCollection("foo"));
		
		expect(service.retrieveAttrIconCollection("foo")).toBeDefined();
	});

	test("attrConstraintCollection", () => {
		expect(() => service.retrieveAttrConstraintCollection("foo")).toThrowError(Error);
	
		service.registerAttrConstraintCollection(new ProductAttrConstraintCollection("foo"));
		
		expect(service.retrieveAttrConstraintCollection("foo")).toBeDefined();
	});

	test("attrStockCollection", () => {
		expect(() => service.retrieveAttrStockCollection("foo")).toThrowError(Error);
	
		service.registerAttrStockCollection(new ProductAttrStockCollection("foo"));
		
		expect(service.retrieveAttrStockCollection("foo")).toBeDefined();
	});

	test("attributes", () => {
		let attr = new ProductAttr(ProductAttrValueType.STRING);
		service.registerAttribute(attr);

		expect(service.retrieveAttribute(attr.getUID())).toBe(attr);
	});

	test("productFamily", () => {
		let family = new DummyFamily("foo", 10, service);
		service.registerProductFamily(family);
		expect(service.retrieveProductFamily("foo")).toBe(family);
	});

	test("productPriceProvider", () => {
		let provider = new DummyProvider("foo");
		service.registerPriceProvider(provider);
		expect(service.retrievePriceProvider("foo")).toBe(provider);
	});

	test("quantityListCollection", () => {
		expect(() => service.retrieveQuantityListCollection("foo")).toThrowError(Error);
	
		service.registerQuantityListCollection(new ProductQuantityListCollection("foo"));
		
		expect(service.retrieveQuantityListCollection("foo")).toBeDefined();
	});

	test("findProduct", () => {
		let family = new DummyFamily("foo", 10, service);
		family.addProduct("bar", "baz");
		service.registerProductFamily(family);

		let retrievedProduct = service.findProduct("foo", "bar");
		expect(retrievedProduct.getProductFamily()).toBe(family);
		expect(retrievedProduct.getName()).toBe("bar");
		expect(retrievedProduct.getSku()).toBe("baz");
	});

	test("registerProductSku", () => {
		service.registerProductSku("foo");
		expect(() => service.registerProductSku("foo")).toThrowError(Error);
		expect(() => service.registerProductSku("bar")).not.toThrowError(Error);
	});
});
