import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class FixedQuantityAttribute extends ProductAttr {
	public static readonly ALIAS = "fixed_quantity";

	public constructor() {
		super( ProductAttrValueType.BOOL, false, true );
	}
}
