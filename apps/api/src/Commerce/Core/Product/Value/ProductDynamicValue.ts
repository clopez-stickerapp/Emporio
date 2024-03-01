import { ConditionTestDataKeyNotFoundException } from "../../../../Helper/Condition/Exception/ConditionTestDataKeyNotFoundException";
import { ProductItem } from "../Item/ProductItem";
import { ProductConditionedValue } from "./ProductConditionedValue";

export class ProductDynamicValue {
	public defaultValue: number;
	public conditionedValues: ProductConditionedValue[] = [];

	public constructor(defaultValue: number) {
		this.defaultValue = defaultValue;
	}

	public addConditionedValue(value: number): ProductConditionedValue {
		let conditionedValue = new ProductConditionedValue(value);
		this.conditionedValues.push(conditionedValue);

		return conditionedValue;
	}

	public getValue(productItem: ProductItem): number {
		let result: Record<number, any> = {};
		for (let conditionedValue of this.conditionedValues) {
			let testResult: boolean;
			try {
				testResult = conditionedValue.conditionBuilder.testOnItem(productItem);
			} catch (error: unknown) {
				if(error instanceof ConditionTestDataKeyNotFoundException){
					testResult = false;
				} else {
					throw error;
				}
			}

			if (testResult === true) {
				let complexityScore = conditionedValue.calculateComplexityScore();
				while (result[complexityScore]) {
					complexityScore++;
				}

				result[complexityScore] = conditionedValue.value;
			}
		}

		if(Object.keys(result).length > 0){
			let sortedResult = Object.keys(result).sort((a, b) => parseFloat(b) - parseFloat(a));
			return result[sortedResult[0]];
		}

		return this.defaultValue;
	}
}