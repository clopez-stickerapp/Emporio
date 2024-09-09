import { AttributeValue, ProductAttrValueType } from "@stickerapp-org/nomisma";

export function testValueType(value: AttributeValue, type: ProductAttrValueType): boolean {
	let result = false;

	switch (type) {
		case ProductAttrValueType.INT:
			result = testIntValueType(value);
			break;

		case ProductAttrValueType.STRING:
			result = testStringValueType(value);
			break;

		case ProductAttrValueType.BOOL:
			result = testBoolValueType(value);
			break;

		case ProductAttrValueType.FLOAT:
			result = testFloatValueType(value);
			break;
	}

	if (!result) {
		throw new Error(`Product attr value type is not valid. ${value} should be ${type}.`);
	}

	return result;
}

function testIntValueType<T>(value: T): boolean {
	if (typeof value === "string" && parseInt(value).toString() == value) {
		value = parseInt(value) as T;
	}

	return (typeof value === "number" && Number.isInteger(value) && !Number.isNaN(value) && isFinite(value));
}

function testStringValueType<T>(value: T): boolean {
	return (typeof value === "string");
}

function testBoolValueType<T>(value: T): boolean {
	return (typeof value === "boolean");
}

function testFloatValueType<T>(value: T): boolean {
	if (typeof value === "string") {
		value = parseFloat(value) as T;
	}

	return (typeof value === "number" && !Number.isNaN(value) && isFinite(value));
}