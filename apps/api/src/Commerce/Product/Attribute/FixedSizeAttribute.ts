import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class FixedSizeAttribute extends ProductAttr {
	public static readonly ALIAS = "fixed_size";

	public constructor() {
		super( ProductAttrValueType.BOOL, false, true );
	}
}
