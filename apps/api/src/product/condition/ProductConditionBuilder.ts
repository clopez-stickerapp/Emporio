import { ConditionBuilder } from "$/conditions/ConditionBuilder";
import { ConditionValue } from "$/conditions/ConditionValue";
import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { ProductItem } from "../ProductItem";

const magicList: Record<string, string[]> = {
	
}

export class ProductConditionBuilder extends ConditionBuilder {
	public constructor(config: ConditionBuilderConfig = {}) {
		super(config, resolve);
	}

	public testOnItem(item: ProductItem): boolean {
		return super.test(item.toTestableOneDimensionalArray());
	}
}

function resolve(value: ConditionValue | null): ConditionValue | null {
	let result: ConditionValue | null = value;

	if (value === null) {
		return null;
	}

	if (typeof value === "string" && value.charAt(0) === "{") {
		console.debug("String found:", value)
		if (stripBrackets(value) in magicList) {
			console.debug("Magic list found:", value, stripBrackets(value));
			return magicList[stripBrackets(value)];
		}
	} else if (Array.isArray(value) && value.length > 0) {
		console.debug("Array found:", value)
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