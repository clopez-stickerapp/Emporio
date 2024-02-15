import { beforeEach, describe, expect, test } from "vitest";
import { ConditionBuilder } from "../src/Helper/Condition/ConditionBuilder";
import { ConditionRelations } from "../src/Helper/Condition/ConditionRelations";
import { Attributes } from "../src/Helper/Condition/Attributes";

let conditionbuilder: ConditionBuilder;
let attributes: Attributes;

beforeEach(() => {
	conditionbuilder = new ConditionBuilder();
	attributes = {
		material: "white",
		laminate: "glossy_uv"
	}

	conditionbuilder.addCondition("material", "==", "white");
	conditionbuilder.addCondition("laminate", "==", "glossy_uv");
});

describe("Test 'AND' operator", () => {
	test("with correct attributes", () => {
		expect(conditionbuilder.test(attributes)).toBe(true);
	});

	test("with one incorrect attribute", () => {
		attributes["material"] = "clear";
		expect(conditionbuilder.test(attributes)).toBe(false);
	});

	test("with two incorrect attributes", () => {
		attributes["material"] = "clear";
		attributes["laminate"] = "satin_matte";
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
		attributes["material"] = "clear";
		attributes["laminate"] = "satin_matte";
		expect(conditionbuilder.test(attributes)).toBe(false);
	});
});
