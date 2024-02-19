import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class WidthAttribute extends ProductAttr {
	public static readonly ALIAS = "width_mm";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
