import { ConditionTestDataKeyNotFoundException } from "$/conditions/exceptions/ConditionTestDataKeyNotFoundException";
import { MinUnitsConfig } from "$/configuration/interface/MinUnitsConfig";
import { ProductItem } from "../ProductItem";
import { ProductConditionedValue } from "./ProductConditionedValue";

export class ProductDynamicValue {
	public defaultValue: number;
	public conditionedValues: ProductConditionedValue[] = [];

	public constructor( config: MinUnitsConfig ) {
		this.defaultValue = config.defaultValue;

		for (let rule of config.rules) {
			console.debug("Adding conditioned value: ", rule.keys);
			this.conditionedValues.push( new ProductConditionedValue(rule.keys, rule.conditions) );
		}
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
			return result[parseFloat(sortedResult[0])];
		}

		return this.defaultValue;
	}
}