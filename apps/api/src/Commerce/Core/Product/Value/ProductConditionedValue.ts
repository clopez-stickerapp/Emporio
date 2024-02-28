import { Attributes } from "../../../../Helper/Condition/Attributes";
import { ProductConditionBuilder } from "../Condition/ProductConditionBuilder";

export class ProductConditionedValue {
	public value: number;
	public conditionBuilder: ProductConditionBuilder;

	public constructor(value: number) {
		this.value = value;
		this.conditionBuilder = new ProductConditionBuilder();
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