import { beforeEach, describe, expect, test } from "vitest";
import { Condition } from "../src/Helper/Condition/Condition";
import { ConditionTestDataKeyNotFoundException } from "../src/Helper/Condition/Exception/ConditionTestDataKeyNotFoundException";

let condition: Condition;
let attributes: Map<string, any>;

beforeEach(() => {	
	attributes = new Map<string, any>();
	attributes.set("material", "white");
	attributes.set("width", 25);
	attributes.set("feature", ["backpaper", "hangtagging"]);
});

describe("Test '==' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("material", "==", "white");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("material", "==", "clear");
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '===' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("material", "===", "white");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("material", "===", "clear");
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '!=' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("material", "!=", "clear");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("material", "!=", "white");
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '!==' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("material", "!==", "clear");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("material", "!==", "white");
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '<' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("width", "<", 26);
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("width", "<", 25);
		expect(condition.test(attributes)).toBe(false);
	});

	test("with invalid attributes", () => {
		condition = new Condition("width", "<", 24);
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '>' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("width", ">", 24);
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("width", ">", 25);
		expect(condition.test(attributes)).toBe(false);
	});

	test("with invalid attributes", () => {
		condition = new Condition("width", ">", 26);
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '>=' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("width", ">=", 24);
		expect(condition.test(attributes)).toBe(true);
	});

	test("with valid attributes", () => {
		condition = new Condition("width", ">=", 25);
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("width", ">=", 26);
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test '<=' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("width", "<=", 26);
		expect(condition.test(attributes)).toBe(true);
	});

	test("with valid attributes", () => {
		condition = new Condition("width", "<=", 25);
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("width", "<=", 24);
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test 'IN' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("feature", "IN", "backpaper");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with valid attributes", () => {
		condition = new Condition("feature", "IN", "hangtagging");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("feature", "IN", "variable-data");
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test 'NOT IN' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("feature", "NOT IN", "variable-data");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with valid attributes", () => {
		condition = new Condition("feature", "NOT IN", "manual-backscore");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("feature", "NOT IN", "backpaper");
		expect(condition.test(attributes)).toBe(false);
	});
});

describe("Test 'IS_EMPTY' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("feature", "IS EMPTY");
		expect(condition.test(attributes)).toBe(false);
	});

	test("with valid attributes", () => {
		condition = new Condition("laminate", "IS EMPTY");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with valid attributes", () => {
		condition = new Condition("height", "IS EMPTY");
		expect(condition.test(attributes)).toBe(true);
	});
});

describe("Test 'IS_NOT_EMPTY' operator", () => {
	test("with valid attributes", () => {
		condition = new Condition("feature", "IS NOT EMPTY");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with valid attributes", () => {
		condition = new Condition("width", "IS NOT EMPTY");
		expect(condition.test(attributes)).toBe(true);
	});

	test("with invalid attributes", () => {
		condition = new Condition("height", "IS NOT EMPTY");
		expect(() => condition.test(attributes)).toThrow(ConditionTestDataKeyNotFoundException);
	});
});