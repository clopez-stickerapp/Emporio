import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class WidthAttribute extends ProductAttr {
	public static readonly ALIAS = "width_mm";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
