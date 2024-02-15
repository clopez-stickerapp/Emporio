import { beforeEach, describe, expect, test } from "vitest";
import { ConditionBuilder } from "../src/Helper/Condition/ConditionBuilder";
import { ConditionRelations } from "../src/Helper/Condition/ConditionRelations";

let conditionbuilder: ConditionBuilder;
let attributes: Map<string, any>;

beforeEach(() => {
	conditionbuilder = new ConditionBuilder();
	attributes = new Map<string, any>();
	attributes.set("material", "white");
	attributes.set("laminate", "glossy_uv");

	conditionbuilder.addCondition("material", "==", "white");
	conditionbuilder.addCondition("laminate", "==", "glossy_uv");
});

describe("Test 'AND' operator", () => {
	test("with correct attributes", () => {
		expect(conditionbuilder.test(attributes)).toBe(true);
	});

	test("with one incorrect attribute", () => {
		attributes.set("material", "clear");
		expect(conditionbuilder.test(attributes)).toBe(false);
	});

	test("with two incorrect attributes", () => {
		attributes.set("material", "clear");
		attributes.set("laminate", "satin_matte");
		expect(conditionbuilder.test(attributes)).toBe(false);
	});
});

describe("Test 'OR' operator", () => {
	test("with two correct attributes", () => {
		conditionbuilder.relationMode = ConditionRelations.OR;
		expect(conditionbuilder.test(attributes)).toBe(true);
	});

	test("with one correct attribute", () => {
		conditionbuilder.relationMode = ConditionRelations.OR;
		expect(conditionbuilder.test(attributes)).toBe(true);
	});

	test("with no correct attributes", () => {
		conditionbuilder.relationMode = ConditionRelations.OR;
		attributes.set("material", "clear");
		attributes.set("laminate", "satin_matte");
		expect(conditionbuilder.test(attributes)).toBe(false);
	});
});
