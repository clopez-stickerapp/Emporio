import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class FixedSizeAttribute extends ProductAttr {
	public static readonly ALIAS = "fixed_size";

	public constructor() {
		super( ProductAttrValueType.BOOL, false, true );
	}
}
