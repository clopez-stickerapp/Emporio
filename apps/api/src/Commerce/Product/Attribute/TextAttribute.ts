import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class TextAttribute extends ProductAttr {
	public static readonly ALIAS = "text";

	public constructor() {
		super( ProductAttrValueType.STRING );
	}
}
