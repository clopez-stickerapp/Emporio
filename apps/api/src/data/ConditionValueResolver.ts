import { ConditionValue } from "$/conditions/ConditionValue";
import { DigitalLaminates, DigitalMaterials, LaserLaminates, LaserMaterials } from "$/configuration/attributes/ProductionLineAttribute";

const magicList: Record<string, string[]> = {
	LaserMaterials: LaserMaterials,
	LaserLaminates: LaserLaminates,
	DigitalMaterials: DigitalMaterials,
	DigitalLaminates: DigitalLaminates,
}

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
	if (value.charAt(0) === "{") {
		if (stripBrackets(value) in magicList) {
			console.debug("Replacing magic value:", stripBrackets(value), "...")
			return magicList[stripBrackets(value)];
		} else {
			console.trace("Magic value not found: " + stripBrackets(value));
			// throw new Error("Magic list not found: " + stripBrackets(value));
		}
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