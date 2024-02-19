import { ConditionBuilder } from "../../../../Helper/Condition/ConditionBuilder";
import { ProductItem } from "../Item/ProductItem";

export class ProductConditionBuilder extends ConditionBuilder {
	public testOnItem(item: ProductItem): boolean {
		return super.test(item.toTestableOneDimensionalArray());
	}
}
