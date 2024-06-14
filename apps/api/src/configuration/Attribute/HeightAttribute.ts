import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class HeightAttribute extends ProductAttr {
	public static readonly ALIAS = "height_mm";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
