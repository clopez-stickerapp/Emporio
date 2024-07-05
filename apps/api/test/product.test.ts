import { Condition } from "$/conditions/Condition";
import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";
import { Product } from "$/product/Product";
import { ProductService } from "$/product/ProductService";

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
