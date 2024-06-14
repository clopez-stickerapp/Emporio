import { Condition } from "$/conditions/Condition";
import { ConditionOperators } from "$/conditions/ConditionOperators";
import { Currencies } from "$/currency/Currency";
import { Price } from "$/prices/Price";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { ProductAttrConstraintCollection } from "$/product/attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrFilterCollection } from "$/product/attribute/Filter/ProductAttrFilterCollection";
import { ProductAttrIconCollection } from "$/product/attribute/Icon/ProductAttrIconCollection";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";
import { ProductAttrStockCollection } from "$/product/attribute/Stock/ProductAttrStockCollection";
import { ProductItem } from "$/product/ProductItem";
import { Product } from "$/product/Product";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "$/product/ProductService";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";

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

class DummyFamily extends ProductFamily {
	public calculateUnits(productItem: ProductItem): number {
		throw new Error("Method not implemented.");
	}
}
class DummyProvider extends ProductPriceProvider {
	public async calculatePrice(productItem: ProductItem, units: number, currency: Currencies): Promise<Price> {
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

class DummyProduct extends Product {
	public getConditions(): Condition[]{
		return Object.values(this.conditions.getConditions()) as Condition[];
	}
}
let product: DummyProduct;

describe("Product", () => {
	beforeEach(() => {
		service = new ProductService();
		family = new DummyFamily("dummy", 10, service);
		service.registerProductFamily(family);

		family.addProduct("test-product", "sku123");

		product = new DummyProduct(family, "test-product", "sku123");
	});

	test("conditions", () => {
		expect(() => product.addCondition("foo", ConditionOperators.EQUAL, "bar")).not.toThrowError(Error);

		expect(product.testAttributes({ foo: "bar" })).toBe(true);
		expect(product.testAttributes({ foo: "baz" })).toBe(false);
	});

	test("attributes", () => {
		expect(product.isAttrRecommendedFor("foo")).toBe(false);
		expect(product.getAttrMap()).toEqual({});
		expect(product.getAttrValue("foo")).toBeUndefined();
		expect(() => product.canAttrBe("foo", "bar")).toThrowError(Error);
		expect(product.canHaveAttr("foo")).toBe(false);

		service.registerAttribute(new ProductAttr(ProductAttrValueType.STRING));
		family.requireAttr("ProductAttr", "foo");
		product.withAttrValue("foo", "bar");		

		expect(product.isAttrRecommendedFor("foo")).toBe(true);
		expect(product.getAttrValue("foo")).toBe("bar");
		expect(product.canAttrBe("foo", "bar")).toBe(true);
		expect(product.canAttrBe("foo", "baz")).toBe(false);
		expect(product.canHaveAttr("foo")).toBe(true);
		expect(product.canHaveAttr("baz")).toBe(false);

		expect(product.getAttrMap()).toEqual({ foo: "bar" });
	});

	describe("withAttrValue", () => {
		describe("non multivalue attribute", () => {
			beforeEach(() => {
				service.registerAttribute(new ProductAttr(ProductAttrValueType.STRING));
				family.requireAttr("ProductAttr", "foo");
			});

			test("required and strictly", () => {
				product.withAttrValue("foo", "bar", true);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(true);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.EQUAL);
				expect(product.getConditions()[0].conditionValue).toBe("bar");
			});

			test("required and strictly with array value", () => {
				product.withAttrValue("foo", ["bar", "baz"], true);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(true);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.IN);
				expect(product.getConditions()[0].conditionValue).toEqual(["bar", "baz"]);
			});

			test("required but not strictly", () => {
				product.withAttrValue("foo", "bar", true, false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.EQUAL);
				expect(product.getConditions()[0].conditionValue).toBe("bar");
			});

			test("required but not strictly with array value", () => {
				product.withAttrValue("foo", ["bar", "baz"], true, false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.IN);
				expect(product.getConditions()[0].conditionValue).toEqual(["bar", "baz"]);
			});

			test("not required", () => {
				product.withAttrValue("foo", "bar", false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(0);
			});

			test("not required and not strictly", () => {
				product.withAttrValue("foo", "bar", false, false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(0);
			});
		});

		describe("multivalue attribute", () => {	
			beforeEach(() => {
				service.registerAttribute(new ProductAttr(ProductAttrValueType.STRING, true));
				family.requireAttr("ProductAttr", "foo");
			});

			test("required and strictly", () => {
				product.withAttrValue("foo", "bar", true);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(true);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.EQUAL);
				expect(product.getConditions()[0].conditionValue).toEqual("bar");
			});

			test("required and strictly with array value", () => {
				product.withAttrValue("foo", ["bar", "baz"], true);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(true);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.EQUAL);
				expect(product.getConditions()[0].conditionValue).toEqual(["bar", "baz"]);
			});
	
			test("required but not strictly", () => {
				product.withAttrValue("foo", "bar", true, false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(1);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.IN);
				expect(product.getConditions()[0].conditionValue).toEqual("bar");
			});

			test("required but not strictly with array value", () => {
				product.withAttrValue("foo", ["bar", "baz"], true, false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(2);
				expect(product.getConditions()[0].columnName).toBe("foo");
				expect(product.getConditions()[0].operator).toBe(ConditionOperators.IN);
				expect(product.getConditions()[0].conditionValue).toEqual("bar");

				expect(product.getConditions()[1].columnName).toBe("foo");
				expect(product.getConditions()[1].operator).toBe(ConditionOperators.IN);
				expect(product.getConditions()[1].conditionValue).toEqual("baz");
			});
	
			test("not required", () => {
				product.withAttrValue("foo", "bar", false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(0);
			});

			test("not required and not strictly", () => {
				product.withAttrValue("foo", "bar", false, false);
				expect(product.isAttrRecommendedFor("foo")).toBe(true);
				expect(product.isAttrStrictlyRequiredFor("foo")).toBe(false);

				expect(product.getConditions()).toHaveLength(0);
			});
		});
	});


});
