import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class DynamicStringAttr extends ProductAttr {
	public static readonly ALIAS = "dynamic_string";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
