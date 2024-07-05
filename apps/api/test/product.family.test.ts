import { Currencies } from "$/currency/Currency";
import { Price } from "$/prices/Price";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { ProductAttrConstraintCollection } from "$/product/attribute/Constraint/ProductAttrConstraintCollection";
import { ProductAttrFilterCollection } from "$/product/attribute/Filter/ProductAttrFilterCollection";
import { Product } from "$/product/Product";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductItem } from "$/product/ProductItem";
import { ProductService } from "$/product/ProductService";

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

let family: ProductFamily;

describe("ProductFamily", () => {
	beforeEach(() => {
		family = new DummyFamily({ name: "foo" });
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