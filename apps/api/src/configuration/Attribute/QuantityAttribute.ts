import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class QuantityAttribute extends ProductAttr {
	public static readonly ALIAS = "quantity";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
