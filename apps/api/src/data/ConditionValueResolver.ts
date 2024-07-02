import { ConditionValue } from "$/conditions/ConditionValue";
import { MaxSizes } from "$/configuration/attributes/MaxSizeAttribute";
import { MaxSizeOtherSideValues } from "$/configuration/attributes/MaxSizeOtherSideAttribute";
import { DigitalLaminates, DigitalMaterials, LaserLaminates, LaserMaterials, ProductionLines } from "$/configuration/attributes/ProductionLineAttribute";

let magicList: Record<string, ConditionValue> = {
	LaserMaterials: LaserMaterials,
	LaserLaminates: LaserLaminates,
	DigitalMaterials: DigitalMaterials,
	DigitalLaminates: DigitalLaminates,
}

// Prefixes the keys of an object with a string, so that they can be used in the magic list
function prefix(prefix: string, obj: Record<string, ConditionValue>): Record<string, ConditionValue> {
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => [`${prefix}.${key}`, value]));
}

magicList = {
	...magicList,
	...prefix("MaxSizes", MaxSizes),
	...prefix("ProductionLines", ProductionLines),
	...prefix("MaxSizeOtherSideValues", MaxSizeOtherSideValues),
	...prefix("ProductionLines", ProductionLines),
};

export function resolve(value: ConditionValue | null): ConditionValue | null {
	let result: ConditionValue | null = value;

	if (typeof value === "string" && value.charAt(0) === "{") {
		result = resolveString(value);
	} else if (Array.isArray(value) && value.length > 0) {
		result = resolveArray(value);
	}

	return result;
}

function resolveString(value: string): ConditionValue {
	if (value.charAt(0) !== "{") {
		return value;
	}

	if (stripBrackets(value) in magicList) {
		console.debug("Replacing magic value:", stripBrackets(value), "...")
		return magicList[stripBrackets(value)];
	} else {
		console.trace("Magic value not found: " + stripBrackets(value));
		// throw new Error("Magic list not found: " + stripBrackets(value));
	}

	return value;
}

function resolveArray(value: string[]): string[] {
	const result: string[] = [];

	for (const item of value) {
		if (typeof item === "string") {
			result.push(item);
		} else if (Array.isArray(item)) {
			result.push(...resolveArray(item));
		} else {
			throw new Error("Array elements must be strings");
		}
	}

	return result;
}

function stripBrackets(value: string): string {
	return value.substring(1, value.length - 1);
}