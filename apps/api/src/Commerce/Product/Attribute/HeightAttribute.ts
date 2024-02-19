import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class HeightAttribute extends ProductAttr {
	public static readonly ALIAS = "height_mm";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
