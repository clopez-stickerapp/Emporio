import { beforeEach, describe, expect, test } from "vitest";
import { Condition } from "../src/Helper/Condition/Condition";
import { ConditionTestDataKeyNotFoundException } from "../src/Helper/Condition/Exception/ConditionTestDataKeyNotFoundException";
import { Attributes } from "../src/Helper/Condition/Attributes";
import { ConditionOperatorNotAllowedException } from "../src/Helper/Condition/Exception/ConditionOperatorNotAllowedException";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";

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
			condition = new Condition("material", ConditionOperators.EQUAL, "white");
			expect(condition).toBeInstanceOf(Condition);
		});

		test("should throw an error if operator is not allowed", () => {
			expect(() => new Condition("material", "><", "white")).toThrow(ConditionOperatorNotAllowedException);
		});
	});

	describe("Test 'test' function", () => {
		test("should throw an error if test data doesn't contain conditioned key", () => {
			condition = new Condition("height", ConditionOperators.EQUAL, 25);
			expect(() => condition.test(attributes)).toThrow(ConditionTestDataKeyNotFoundException);
		});

		test("should not throw an error for certain operators when the test data doesn't contain conditioned key", () => {
			condition = new Condition("height", ConditionOperators.IS_EMPTY);
			expect(condition.test(attributes)).toBe(true);

			condition = new Condition("height", ConditionOperators.NOT_IN, ["25", "26", "27"]);
			expect(condition.test(attributes)).toBe(true);

			condition = new Condition("height", ConditionOperators.NOT_EQUAL, 25);
			expect(condition.test(attributes)).toBe(true);

			condition = new Condition("height", ConditionOperators.NOT_IDENTICAL, 25);
			expect(condition.test(attributes)).toBe(true);
		});
	});
});

describe("Test operators", () => {
	describe("Test '==' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("material", ConditionOperators.EQUAL, "white");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("material", ConditionOperators.EQUAL, "clear");
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '===' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("material", ConditionOperators.IDENTICAL, "white");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("material", ConditionOperators.IDENTICAL, "clear");
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '!=' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("material", ConditionOperators.NOT_EQUAL, "clear");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("material", ConditionOperators.NOT_EQUAL, "white");
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '!==' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("material", ConditionOperators.NOT_IDENTICAL, "clear");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("material", ConditionOperators.NOT_IDENTICAL, "white");
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '<' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.LESS_THAN, 26);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("width", ConditionOperators.LESS_THAN, 25);
			expect(condition.test(attributes)).toBe(false);
		});

		test("with invalid attributes", () => {
			condition = new Condition("width", ConditionOperators.LESS_THAN, 24);
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '>' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.GREATER_THAN, 24);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("width", ConditionOperators.GREATER_THAN, 25);
			expect(condition.test(attributes)).toBe(false);
		});

		test("with invalid attributes", () => {
			condition = new Condition("width", ConditionOperators.GREATER_THAN, 26);
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '>=' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.GREATER_THAN_OR_EQUAL, 24);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.GREATER_THAN_OR_EQUAL, 25);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("width", ConditionOperators.GREATER_THAN_OR_EQUAL, 26);
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test '<=' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.LESS_THAN_OR_EQUAL, 26);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.LESS_THAN_OR_EQUAL, 25);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("width", ConditionOperators.LESS_THAN_OR_EQUAL, 24);
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test 'IN' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("feature", ConditionOperators.IN, "backpaper");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition("feature", ConditionOperators.IN, "hangtagging");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("feature", ConditionOperators.IN, "variable-data");
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test 'NOT IN' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("feature", ConditionOperators.NOT_IN, "variable-data");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition("feature", ConditionOperators.NOT_IN, "manual-backscore");
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("feature", ConditionOperators.NOT_IN, "backpaper");
			expect(condition.test(attributes)).toBe(false);
		});
	});

	describe("Test 'IS_EMPTY' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("feature", ConditionOperators.IS_EMPTY);
			expect(condition.test(attributes)).toBe(false);
		});

		test("with valid attributes", () => {
			condition = new Condition("laminate", ConditionOperators.IS_EMPTY);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition("height", ConditionOperators.IS_EMPTY);
			expect(condition.test(attributes)).toBe(true);
		});
	});

	describe("Test 'IS_NOT_EMPTY' operator", () => {
		test("with valid attributes", () => {
			condition = new Condition("feature", ConditionOperators.IS_NOT_EMPTY);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with valid attributes", () => {
			condition = new Condition("width", ConditionOperators.IS_NOT_EMPTY);
			expect(condition.test(attributes)).toBe(true);
		});

		test("with invalid attributes", () => {
			condition = new Condition("height", ConditionOperators.IS_NOT_EMPTY);
			expect(() => condition.test(attributes)).toThrow(ConditionTestDataKeyNotFoundException);
		});
	});
});