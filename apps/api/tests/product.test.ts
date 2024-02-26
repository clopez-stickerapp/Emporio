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