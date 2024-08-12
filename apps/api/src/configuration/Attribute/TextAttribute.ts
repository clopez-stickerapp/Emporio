import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class TextAttribute extends ProductAttr {
	public static readonly ALIAS = "text";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
