import { ConditionTestDataKeyNotFoundException } from "$/conditions/exceptions/ConditionTestDataKeyNotFoundException";
import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { DynamicValueConfig } from "$/configuration/interface/DynamicValueConfig";
import { ProductItem } from "@stickerapp-org/nomisma";
import { ProductConditionedValue } from "./ProductConditionedValue";

export class ProductDynamicValue {
	protected defaultValue: number;
	protected conditionedValues: ProductConditionedValue[] = [];

	public constructor( config: DynamicValueConfig ) {
		this.defaultValue = config.defaultValue;

		for (let rule of config.rules) {
			console.debug(`Adding conditions for value '${rule.keys}' to '${config.name}'`);
			this.addConditionedValue(rule.keys, rule.conditions);
		}
	}

	public addConditionedValue(value: number, config: ConditionBuilderConfig = {}): ProductConditionedValue {
		let conditionedValue = new ProductConditionedValue(value, config);
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
			return result[parseFloat(sortedResult[0])];
		}

		return this.defaultValue;
	}
}