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
		if (stripBrackets(value) in magicList) {
			console.debug("Replacing magic value:", stripBrackets(value), "...")
			return magicList[stripBrackets(value)];
		} else {
			console.trace("Magic value not found: " + stripBrackets(value));
			// throw new Error("Magic list not found: " + stripBrackets(value));
		}
	} else if (Array.isArray(value) && value.length > 0) {
		const resultArray: string[] = [];
		for (const item of value) {
			let resolvedResult = resolve(item);

			if (typeof resolvedResult === "string") {
				resultArray.push(resolvedResult);
			} else if (Array.isArray(resolvedResult)) {
				resultArray.push(...resolvedResult);
			} else {
				throw new Error("Array elements must be strings");
			}
		}
		result = resultArray;
	}

	return result;
}

function stripBrackets(value: string): string {
	return value.substring(1, value.length - 1);
}