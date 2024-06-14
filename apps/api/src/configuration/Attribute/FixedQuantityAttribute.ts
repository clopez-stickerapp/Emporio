import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class FixedQuantityAttribute extends ProductAttr {
	public static readonly ALIAS = "fixed_quantity";

	public constructor() {
		super( ProductAttrValueType.BOOL, false, true );
	}
}
