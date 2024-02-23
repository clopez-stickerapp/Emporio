import { beforeEach, describe, expect, test } from "vitest";
import { ConditionBuilder } from "../src/Helper/Condition/ConditionBuilder";
import { ConditionRelations } from "../src/Helper/Condition/ConditionRelations";
import { Attributes } from "../src/Helper/Condition/Attributes";
import { ConditionOperators } from "../src/Helper/Condition/ConditionOperators";

let conditionbuilder: ConditionBuilder;
let attributes: Attributes;

describe("Test 'AND' operator", () => {
	beforeEach(() => {
		conditionbuilder = new ConditionBuilder();
		attributes = {
			material: "white",
			laminate: "glossy_uv"
		}
	
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		conditionbuilder.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
	});

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
	beforeEach(() => {
		conditionbuilder = new ConditionBuilder();
		attributes = {
			material: "white",
			laminate: "glossy_uv"
		}
	
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		conditionbuilder.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
	});

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

describe("Test calculateComplexityScore", () => {
	beforeEach(() => {
		conditionbuilder = new ConditionBuilder();
		attributes = {
			material: "white",
			laminate: "glossy_uv"
		}
	});

	test("with no conditions", () => {
		expect(conditionbuilder.calculateComplexityScore()).toBe(0);
	});

	test("with one condition", () => {
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		expect(conditionbuilder.calculateComplexityScore()).toBe(10);
	});

	test("with two conditions", () => {
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		conditionbuilder.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		expect(conditionbuilder.calculateComplexityScore()).toBe(25);
	});

	test("with a subgroup", () => {
		const subgroup = conditionbuilder.addSubGroup();
		subgroup.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		expect(conditionbuilder.calculateComplexityScore()).toBe(125);
	});

	test("with a subgroup and a condition", () => {
		const subgroup = conditionbuilder.addSubGroup();
		subgroup.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");

		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		expect(conditionbuilder.calculateComplexityScore()).toBe(140);
	});

	test("with a subgroup, relationtype OR and a condition", () => {
		const subgroup = conditionbuilder.addSubGroup();
		subgroup.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");

		conditionbuilder.relationMode = ConditionRelations.OR;
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		expect(conditionbuilder.calculateComplexityScore()).toBe(135);
	});

	test("with two subgroups", () => {
		const subgroup1 = conditionbuilder.addSubGroup();
		subgroup1.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup1.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		const subgroup2 = conditionbuilder.addSubGroup();
		subgroup2.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup2.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		expect(conditionbuilder.calculateComplexityScore()).toBe(255);
	});

	test("with two subgroups and relationtype OR", () => {
		const subgroup1 = conditionbuilder.addSubGroup();
		subgroup1.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup1.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		const subgroup2 = conditionbuilder.addSubGroup();
		subgroup2.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup2.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		
		conditionbuilder.relationMode = ConditionRelations.OR;
		expect(conditionbuilder.calculateComplexityScore()).toBe(250);
	});

	test("with two subgroups and relationtype OR and a condition", () => {
		const subgroup1 = conditionbuilder.addSubGroup();
		subgroup1.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup1.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		const subgroup2 = conditionbuilder.addSubGroup();
		subgroup2.addCondition("material", ConditionOperators.EQUAL, "white");
		subgroup2.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");

		conditionbuilder.relationMode = ConditionRelations.OR;
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		expect(conditionbuilder.calculateComplexityScore()).toBe(260);
	});
});

describe("Test count", () => {
	beforeEach(() => {
		conditionbuilder = new ConditionBuilder();
	});

	test("with no conditions", () => {
		expect(conditionbuilder.count()).toBe(0);
	});

	test("with one condition", () => {
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		expect(conditionbuilder.count()).toBe(1);
	});

	test("with two conditions", () => {
		conditionbuilder.addCondition("material", ConditionOperators.EQUAL, "white");
		conditionbuilder.addCondition("laminate", ConditionOperators.EQUAL, "glossy_uv");
		expect(conditionbuilder.count()).toBe(2);
	});
});