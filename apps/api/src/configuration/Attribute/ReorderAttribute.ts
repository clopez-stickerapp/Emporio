import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ReorderAttribute extends ProductAttr {
	public static readonly ALIAS = "reorder_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
