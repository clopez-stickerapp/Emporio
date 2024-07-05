import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { ProductAttrConstraint } from "$/product/attribute/Constraint/ProductAttrConstraint";
import { ProductAttrFilter } from "$/product/attribute/Filter/ProductAttrFilter";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";
import { Collection } from "$/product/Collection";
import { ProductService } from "$/product/ProductService";

let service: ProductService;

describe("ProductService", () => {
	beforeEach(() => {
		service = new ProductService({name: "test", collections: []});
	});

	test("attrFilterCollection", () => {
		expect(() => service.retrieveCollection("foo")).toThrowError(Error);
	
		service.registerCollection(new Collection<ProductAttrFilter>({name: "foo", values: []}));
		
		expect(service.retrieveCollection("foo")).toBeDefined();
	});

	test("attrIconCollection", () => {
		expect(() => service.retrieveCollection("foo")).toThrowError(Error);
	
		service.registerCollection(new ProductAttrIconCollection("foo"));
		
		expect(service.retrieveCollection("foo")).toBeDefined();
	});

	test("attrConstraintCollection", () => {
		expect(() => service.retrieveCollection("foo")).toThrowError(Error);
	
		service.registerCollection(new Collection<ProductAttrConstraint>({name: "foo", values: []}));
		
		expect(service.retrieveCollection("foo")).toBeDefined();
	});

	test("attrStockCollection", () => {
		expect(() => service.retrieveCollection("foo")).toThrowError(Error);
	
		service.registerCollection(new ProductAttrStockCollection("foo"));
		
		expect(service.retrieveCollection("foo")).toBeDefined();
	});

	test("attributes", () => {
		let attr = new ProductAttr({ name: "test", type: ProductAttrValueType.STRING });
		service.registerAttribute(attr.getName(), attr);

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