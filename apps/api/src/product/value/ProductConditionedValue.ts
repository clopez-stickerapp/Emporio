import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { Attributes } from "$/product/attribute/Attributes";
import { ProductConditionBuilder } from "../condition/ProductConditionBuilder";

export class ProductConditionedValue {
	public value: number;
	public conditionBuilder: ProductConditionBuilder;

	public constructor(value: number, config: ConditionBuilderConfig) {
		this.value = value;
		this.conditionBuilder = new ProductConditionBuilder(config);
	}

	public calculateComplexityScore(): number {
		return this.conditionBuilder.calculateComplexityScore();
	}

	public test(data: Attributes): boolean {
		try{
			return this.conditionBuilder.test(data);
		} catch (error) {
			return false;
		}
	}
}