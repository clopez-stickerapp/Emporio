import { ConditionBuilder } from "$/conditions/ConditionBuilder";
import { ConditionBuilderConfig } from "$/configuration/interface/ConditionBuilderConfig";
import { resolve } from "$data/ConditionValueResolver";
import { ProductItem } from "../ProductItem";

export class ProductConditionBuilder extends ConditionBuilder {
	public constructor(config: ConditionBuilderConfig = {}) {
		super(config, resolve);
	}

	public testOnItem(item: ProductItem): boolean {
		return super.test(item.toTestableOneDimensionalArray());
	}
}

