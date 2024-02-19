import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class ReorderAttribute extends ProductAttr {
	public static readonly ALIAS = "reorder_id";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
