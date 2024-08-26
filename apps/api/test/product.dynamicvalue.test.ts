import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ProductItem } from "@stickerapp-org/nomisma";
import { ProductDynamicValue } from "$/product/value/ProductDynamicValue";

let value: ProductDynamicValue;
let item: ProductItem;

describe("ProductDynamicValue", () => {
	beforeEach(() => {
		value = new ProductDynamicValue({ name: "test", defaultValue: 10, rules: []});
		item = new ProductItem("foo", "bar");
	});

	describe("getValue", () => {
		test("should return the default value", () => {
			expect(value.getValue(item)).toBe(10);
		});

		test("should return the default value if no conditioned value matches", () => {
			value.addConditionedValue(20).conditionBuilder.addCondition({ attribute: "foo", operator: ConditionOperators.EQUAL, value: "bar"});
			expect(value.getValue(item)).toBe(10);
		});

		test("should return the conditioned value if the condition matches", () => {
			value.addConditionedValue(20).conditionBuilder.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "bar"});
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
			value.addConditionedValue(20).conditionBuilder.addCondition({ attribute: "item.attributes.foo", operator: ConditionOperators.EQUAL, value: "bar"});
			value.addConditionedValue(30);
			item.setAttribute("foo", "bar");
			expect(value.getValue(item)).toBe(20);
		});
	});
});