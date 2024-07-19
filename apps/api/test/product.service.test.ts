import { CollectionType } from "$/configuration/interface/CollectionConfig";
import { ProductPriceProvider } from "$/prices/ProductPriceProvider";
import { ProductQuantityListCollection } from "$/prices/ProductQuantityListCollection";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";
import { Collection } from "$/product/Collection";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "$/product/ProductService";
import { UnitTypeNames } from "$/product/unit-type/AllUnitTypes";

class DummyPriceProvider extends ProductPriceProvider {
	public async calculatePrice(): Promise<any> {
		return {};
	}
}
let service: ProductService;

describe("ProductService", () => {
	beforeEach(() => {
		service = new ProductService({name: "test", collections: {
			constraint: "", 
			asset: "",
			filter: ""
		}});
	});

	test("collection", () => {
		expect(() => service.retrieveCollection(CollectionType.Filter, "foo")).toThrowError(Error);
	
		service.registerCollection(new Collection({name: "foo", values: [], type: CollectionType.Filter}));
		
		expect(service.retrieveCollection(CollectionType.Filter, "foo")).toBeDefined();
	});

	test("register and retrieve attributes", () => {
		let attr = new ProductAttr({ name: "test", type: ProductAttrValueType.STRING });
		service.registerAttribute(attr.getName(), attr);

		expect(service.retrieveAttribute(attr.getName())).toBe(attr);
	});

	test("register and retrieve productFamily", () => {
		let family = new ProductFamily({ name: "foo", products: [], rules: {
			collections:{
				asset: "",
				constraint: "",
				filter: "",
				min_units: "",
				price_provider: "",
				quantity_provider: ""
			}
		}, unitType: UnitTypeNames.PerPiece});

		service.registerProductFamily(family.getName(), family);
		expect(service.retrieveProductFamily("foo")).toBe(family);
	});

	test("productPriceProvider", () => {
		let provider = new DummyPriceProvider("foo");
		service.registerPriceProvider(provider);
		expect(service.retrievePriceProvider("foo")).toBe(provider);
	});

	test("quantityListCollection", () => {
		expect(() => service.retrieveQuantityListCollection("foo")).toThrowError(Error);
	
		service.registerQuantityListCollection(new ProductQuantityListCollection("foo"));
		
		expect(service.retrieveQuantityListCollection("foo")).toBeDefined();
	});

	test("findProduct", () => {
		let family = new ProductFamily({ name: "foo", products: [], rules: {
			collections:{
				asset: "",
				constraint: "",
				filter: "",
				min_units: "",
				price_provider: "",
				quantity_provider: ""
			}
		}, unitType: UnitTypeNames.PerPiece});

		service.registerProductFamily(family.getName(), family);

		family.addProduct({
			name: "bar",
			sku: "baz",
			available: true,
			status: "active"
		});

		let retrievedProduct = service.retrieveProductFamily("foo").getProduct("bar");
		expect(retrievedProduct.getProductFamilyName()).toBe("foo");
		expect(retrievedProduct.getName()).toBe("bar");
		expect(retrievedProduct.getSku()).toBe("baz");
	});
});