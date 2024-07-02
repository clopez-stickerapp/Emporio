import { ConditionValue } from "$/conditions/ConditionValue";
import { CutDirectionAttributeValues } from "$/configuration/attributes/CutDirectionAttribute";
import { EffectLayerMaterials, ProductFeatures } from "$/configuration/attributes/FeatureAttribute";
import { LaminateValues } from "$/configuration/attributes/LaminateAttribute";
import { MaterialValues } from "$/configuration/attributes/MaterialAttribute";
import { MaxSizes } from "$/configuration/attributes/MaxSizeAttribute";
import { MaxSizeOtherSideValues } from "$/configuration/attributes/MaxSizeOtherSideAttribute";
import { DigitalLaminates, DigitalMaterials, LaserLaminates, LaserMaterials, ProductionLines } from "$/configuration/attributes/ProductionLineAttribute";

let magicList: Record<string, ConditionValue> = {
	LaserMaterials: LaserMaterials,
	LaserLaminates: LaserLaminates,
	DigitalMaterials: DigitalMaterials,
	DigitalLaminates: DigitalLaminates,
	EffectLayerMaterials: EffectLayerMaterials,
}

// Prefixes the keys of an object with a string, so that they can be used in the magic list
function prefix(prefix: string, obj: Record<string, ConditionValue>): Record<string, ConditionValue> {
	return Object.fromEntries(Object.entries(obj).map(([key, value]) => [`${prefix}.${key}`, value]));
}

export const ProductNames = {
	PRODUCT_DIE_CUT: "die_cut",
	PRODUCT_SINGLE_ON_SHEET: "single_on_sheet",
	PRODUCT_SHEET: "sheet",
	PRODUCT_SHEET_KISS_CUT: "sheet_kiss_cut",
	PRODUCT_SHEET_LEGACY: "sheet_legacy",
	PRODUCT_HANG_TAG: "hang_tag",
	PRODUCT_3D_DOME: "3d_dome",
	PRODUCT_FRONT_ADHESIVE: "front_adhesive",
	PRODUCT_HEAVY_DUTY: "heavy_duty",
	PRODUCT_REMOVABLE: "removable",
	PRODUCT_WALL: "wall",
	PRODUCT_FLOOR: "floor",
	PRODUCT_LAPTOP_SKIN: "laptop_skin",
	PRODUCT_DOUBLE_SIDED: "double_sided",
	PRODUCT_LABELS_ON_SHEET: "labels_on_sheet",
	PRODUCT_LABELS_ON_ROLL: "labels_on_roll",
	PRODUCT_LIBRARY_DESIGN: "library_design",
	PRODUCT_TRANSFER_DECAL: "transfer_decal",
	PRODUCT_WINDOW: "window",
}

magicList = {
	...magicList,
	...prefix("MaxSizes", MaxSizes),
	...prefix("ProductionLines", ProductionLines),
	...prefix("MaxSizeOtherSideValues", MaxSizeOtherSideValues),
	...prefix("ProductionLines", ProductionLines),
	...prefix("CutDirectionAttributeValues", CutDirectionAttributeValues),
	...prefix("ProductFeatures", ProductFeatures),
	...prefix("MaterialValues", MaterialValues),
	...prefix("LaminateValues", LaminateValues),
	...prefix("ProductNames", ProductNames),
};

export function resolve(value: ConditionValue | null): ConditionValue | null {
	let result: ConditionValue | null = value;

	// console.log("Resolving value:", value);

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

	// console.debug("Resolving string magic value:", value, "...");

	if (stripBrackets(value) in magicList) {
		console.debug("Replacing magic value:", stripBrackets(value), "...")
		return magicList[stripBrackets(value)];
	} else {
		console.trace("Magic value not found: " + stripBrackets(value));
		// throw new Error("Magic list not found: " + stripBrackets(value));
	}

	return value;
}

function resolveArray(value: string[]): ConditionValue {
	const result: ConditionValue = [];

	// console.log("Resolving array magic value:", value, "...");

	for (const item of value) {
		result.push(resolveString(item) as string);
	}

	return result;
}

function stripBrackets(value: string): string {
	return value.substring(1, value.length - 1);
}