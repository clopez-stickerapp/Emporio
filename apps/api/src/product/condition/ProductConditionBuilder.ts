import { ConditionBuilder } from "$/conditions/ConditionBuilder";
import { ProductItem } from "../ProductItem";

export class ProductConditionBuilder extends ConditionBuilder {
	public testOnItem(item: ProductItem): boolean {
		return super.test(item.toTestableOneDimensionalArray());
	}
}
