import { ProductAttr } from "$/product/attribute/ProductAttr";
import { Product } from "$/product/Product";
import { ProductFamily } from "$/product/ProductFamily";
import { UnitTypeNames } from "$/product/unit-type/AllUnitTypes";
import { ProductAttrValueType } from "@stickerapp-org/nomisma";

let family: ProductFamily;

describe("ProductFamily", () => {
	beforeEach(() => {
		family = new ProductFamily({ name: "foo", products: [], rules: {
			collections:{
				asset: "",
				constraint: "",
				filter: "",
				min_units: "",
				price_provider: "",
				quantity_provider: ""
			}
		}, unitType: UnitTypeNames.PerPiece});
	});

	test("getName", () => {
		expect(family.getName()).toBe("foo");
	});

	test("addProduct", () => {
		expect(() => family.getProduct("bar")).toThrowError(Error);

		family.addProduct({
			name: "bar",
			sku: "baz",
			available: true,
			status: "active"
		});

		expect(family.getProduct("bar")).toBeDefined();
	});

	test("getProducts", () => {
		expect(family.getProducts()).toEqual({});

		family.addProduct({
			name: "bar",
			sku: "baz",
			available: true,
			status: "active"
		});

		expect(family.getProducts()).toEqual({ bar: expect.any(Product) });
	});

	test("attributes", () => {
		const attrFoo = new ProductAttr({ name: "foo", type:ProductAttrValueType.STRING, values: ["bar", "baz"] });
		const attrBar = new ProductAttr({ name: "bar", type:ProductAttrValueType.STRING, values: ["foo", "baz"] });
		
		expect(() => family.requireAttr("foo", attrFoo)).not.toThrowError(Error);
		expect(() => family.requireAttr("foo", attrFoo)).toThrowError(Error);
		expect(() => family.supportAttr("foo", attrFoo)).toThrowError(Error);
		expect(() => family.supportAttr("bar", attrBar)).not.toThrowError(Error);
		expect(() => family.requireAttr("bar", attrBar)).toThrowError(Error);
		expect(() => family.supportAttr("bar", attrBar)).toThrowError(Error);

		expect(family.getRequiredAttrs()).toEqual({ foo: attrFoo });
		expect(family.isRequired("foo")).toBe(true);
		expect(family.isRequired("bar")).toBe(false);

		expect(family.getSupportedAttrs()).toEqual({ bar: attrBar });
		expect(family.isSupported("bar")).toBe(true);
		expect(family.isSupported("foo")).toBe(true);

		expect(family.getAttributes()).toEqual({ foo: attrFoo, bar: attrBar });
	});

	test("getAllAttributeValueOptionsForProduct", () => {
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

		family.addProduct({
			name: "bar",
			sku: "baz",
			available: true,
			status: "active"
		});

		family.requireAttr("foo", new ProductAttr({ name: "foo", type: ProductAttrValueType.STRING, values: ["bar", "baz"] }));

		expect(family.getAllAttributeValueOptionsForProduct(family.getProduct("bar"), "foo")).toEqual(["bar", "baz"]);
	});

	test("getDefaultAttributeValueOptionsForProduct", () => {
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

		family.addProduct({
			name: "bar",
			sku: "baz",
			available: true,
			status: "active"
		});

		family.requireAttr("foo", new ProductAttr({ name: "foo", type: ProductAttrValueType.STRING }));

		expect(family.getDefaultAttributeValueOptionsForProduct(family.getProduct("bar"), "foo")).toEqual([]);
	});
});