import { Condition } from "$/conditions/Condition";
import { ConditionOperators } from "$/conditions/ConditionOperators";
import { ConditionTestDataKeyNotFoundException } from "$/conditions/exceptions/ConditionTestDataKeyNotFoundException";
import { Attributes } from "$/product/attribute/Attributes";
import { beforeEach, describe, expect, test } from "vitest";

let condition: Condition;
let attributes: Attributes;

beforeEach(() => {
	attributes = {
		material: "white",
		width: 25,
		feature: ["backpaper", "hangtagging"]
	};
});

describe("Test functions", () => {
	describe("Test constructor", () => {
		test("should be able to be instanced", () => {
			condition = new Condition({ attribute: "material", operator: ConditionOperators.EQUAL, value: "white" });
			expect(condition).toBeInstanceOf(Condition);
		});
	});

	describe("Test 'test' function", () => {
		test("should throw an error if test data doesn't contain conditioned key", () => {
			condition = new Condition({ attribute: "height", operator: ConditionOperators.EQUAL, value: 25 });
			expect(() => condition.test(attributes)).toThrow(ConditionTestDataKeyNotFoundException);
		});

		test("should not throw an error for certain operators when the test data doesn't contain conditioned key", () => {
			condition = new Condition({ attribute: "height", operator: ConditionOperators.IS_EMPTY });
			expect(condition.test(attributes)).toBe(true);

			condition = new Condition({ attribute: "height", operator: ConditionOperators.NOT_IN, value: ["25", "26", "27"] });
			expect(condition.test(attributes)).toBe(true);

			condition = new Condition({ attribute: "height", operator: ConditionOperators.NOT_EQUAL, value: 25 });
			expect(condition.test(attributes)).toBe(true);
		});
	});
});

describe("Test operators", () => {
	describe("Test '==' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "material", operator: ConditionOperators.EQUAL, value: "white" });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "material", operator: ConditionOperators.EQUAL, value: "clear" });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '!=' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "material", operator: ConditionOperators.NOT_EQUAL, value: "clear" });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "material", operator: ConditionOperators.NOT_EQUAL, value: "white" });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '<' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.LESS_THAN, value: 26 });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.LESS_THAN, value: 25 });
			expect(condition.test(attributes)).toBe(false);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.LESS_THAN, value: 24 });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '>' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.GREATER_THAN, value: 24 });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.GREATER_THAN, value: 25 });
			expect(condition.test(attributes)).toBe(false);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.GREATER_THAN, value: 26 });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '>=' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.GREATER_THAN_OR_EQUAL, value: 24 });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.GREATER_THAN_OR_EQUAL, value: 25 });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.GREATER_THAN_OR_EQUAL, value: 26 });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '<=' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.LESS_THAN_OR_EQUAL, value: 26 });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.LESS_THAN_OR_EQUAL, value: 25 });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.LESS_THAN_OR_EQUAL, value: 24 });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test 'IN' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.IN, value: "backpaper" });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.IN, value: "hangtagging" });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.IN, value: "variable-data" });
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test 'NOT IN' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.NOT_IN, value: "variable-data" });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.NOT_IN, value: "manual-backscore" })
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.NOT_IN, value: "backpaper" })
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test 'IS_EMPTY' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.IS_EMPTY });
			expect(condition.test(attributes)).toBe(false);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "laminate", operator: ConditionOperators.IS_EMPTY });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "height", operator: ConditionOperators.IS_EMPTY });
			expect(condition.test(attributes)).toBe(true);
		});
	});

	describe("Test 'IS_NOT_EMPTY' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition({ attribute: "feature", operator: ConditionOperators.IS_NOT_EMPTY });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition({ attribute: "width", operator: ConditionOperators.IS_NOT_EMPTY });
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition({ attribute: "height", operator: ConditionOperators.IS_NOT_EMPTY });
			expect(() => condition.test(attributes)).toThrow(ConditionTestDataKeyNotFoundException);
		});
	});
});