import { beforeEach, describe, expect, test } from "vitest";
import { ProductDynamicValue } from "../src/Commerce/Core/Product/Value/ProductDynamicValue";
import { ProductItem } from "../src/Commerce/Core/Product/Item/ProductItem";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";
import { Product } from "../src/Commerce/Core/Product/Product";
import { ProductFamily } from "../src/Commerce/Core/Product/ProductFamily";
import { ProductService } from "../src/Commerce/Core/ProductService";
import { ProductAttr } from "../src/Commerce/Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../src/Commerce/Core/Product/Attribute/ProductAttrValueType";
import { ProductAttrFilterCollection } from "../src/Commerce/Core/Product/Attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrIconCollection } from "../src/Commerce/Core/Product/Attribute/Icon/ProductAttrIconCollection";
import { ProductAttrConstraintCollection } from "../src/Commerce/Core/Product/Attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrStockCollection } from "../src/Commerce/Core/Product/Attribute/Stock/ProductAttrStockCollection";
import { ProductPriceProvider } from "../src/Commerce/Core/Price/ProductPriceProvider";
import { Currencies } from "../src/Commerce/Core/Currency/Currency";
import { Price } from "../src/Commerce/Core/Price/Price";
import { ProductQuantityListCollection } from "../src/Commerce/Core/Price/ProductQuantityListCollection";

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

let family: ProductFamily;

describe("ProductFamily", () => {
	beforeEach(() => {
		service = new ProductService();
		family = new DummyFamily("foo", 10, service);
	});

	test("getName", () => {
		expect(family.getName()).toBe("foo");
	});

	test("addProduct", () => {
		expect(() => family.getProduct("bar")).toThrowError(Error);

		family.addProduct("bar", "baz");

		expect(family.getProduct("bar")).toBeDefined();
	});

	test("minimumUnitsValue", () => {
		expect(family.getMinimumUnits(new ProductItem("foo", "bar"))).toBe(10);
	});

	test("getProducts", () => {
		expect(family.getProducts()).toEqual({});

		family.addProduct("bar", "baz");
		expect(family.getProducts()).toEqual({ bar: expect.any(Product) });
	});

	test("attributes", () => {
		expect(() => family.requireAttr("foo", "bar")).not.toThrowError(Error);
		expect(() => family.requireAttr("foo", "bar")).toThrowError(Error);
		expect(() => family.supportAttr("foo", "bar")).toThrowError(Error);
		expect(() => family.supportAttr("foo", "baz")).not.toThrowError(Error);
		expect(() => family.requireAttr("foo", "baz")).toThrowError(Error);
		expect(() => family.supportAttr("foo", "baz")).toThrowError(Error);

		expect(family.getRequiredAttrs()).toEqual({ bar: "foo" });
		expect(family.isRequired("bar")).toBe(true);
		expect(family.isRequired("baz")).toBe(false);

		expect(family.getSupportedAttrs()).toEqual({ baz: "foo" });
		expect(family.isSupported("bar")).toBe(true);
		expect(family.isSupported("baz")).toBe(true);

		expect(family.getAttributes()).toEqual({ bar: "foo", baz: "foo" });

		expect(family.findAttrUIDByAlias("bar")).toBe("foo");
		expect(family.findAttrUIDByAlias("baz")).toBe("foo");
	});

	test("productService", () => {
		expect(family.getProductService()).toBe(service);

		let newService = new ProductService();

		family.setProductService(newService);
		expect(family.getProductService()).toBe(newService);
	});

	test("attrConstraintCollection", () => {
		expect(family.getConstraintsCollection()).toBeNull();

		family.relateConstraintCollection("foo");
		expect(() => family.getConstraintsCollection()).toThrowError(Error);

		service.registerAttrConstraintCollection(new ProductAttrConstraintCollection("foo"));
		expect(family.getConstraintsCollection()).toBeDefined();
	});

	test("attrFilterCollection", () => {
		expect(family.getFilterCollection()).toBeNull();

		family.relateFilterCollection("foo");
		expect(() => family.getFilterCollection()).toThrowError(Error);

		service.registerAttrFilterCollection(new ProductAttrFilterCollection("foo"));
		expect(family.getFilterCollection()).toBeDefined();
	});

	test("attrIconCollection", () => {
		expect(family.getIconsCollection()).toBeNull();

		family.relateIconCollection("foo");
		expect(() => family.getIconsCollection()).toThrowError(Error);

		service.registerAttrIconCollection(new ProductAttrIconCollection("foo"));
		expect(family.getIconsCollection()).toBeDefined();
	});

	test("stockCollection", () => {
		expect(family.getStockCollection()).toBeNull();

		family.relateStockCollection("foo");
		expect(() => family.getStockCollection()).toThrowError(Error);

		service.registerAttrStockCollection(new ProductAttrStockCollection("foo"));
		expect(family.getStockCollection()).toBeDefined();
	});

	test("productPriceProvider", () => {
		expect(family.getProductPriceProvider()).toBeNull();

		family.relateProductPriceProvider("foo");
		expect(() => family.getProductPriceProvider()).toThrowError(Error);

		service.registerPriceProvider(new DummyProvider("foo"));
		expect(family.getProductPriceProvider()).toBeDefined();
	});

	test("productQuantityListCollection", () => {
		expect(family.getProductQuantityListCollection()).toBeNull();

		family.relateProductQuantityListCollection("foo");
		expect(() => family.getProductQuantityListCollection()).toThrowError(Error);

		service.registerQuantityListCollection(new ProductQuantityListCollection("foo"));
		expect(family.getProductQuantityListCollection()).toBeDefined();
	});
});

