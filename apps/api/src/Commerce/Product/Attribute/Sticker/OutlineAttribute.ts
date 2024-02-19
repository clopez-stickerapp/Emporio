import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class OutlineAttribute extends ProductAttr {
	public static readonly ALIAS = "outline";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
