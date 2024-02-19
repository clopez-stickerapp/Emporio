import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class SizeAttribute extends ProductAttr {
	public static readonly ALIAS = "size";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
