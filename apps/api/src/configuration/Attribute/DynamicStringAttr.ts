import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DynamicStringAttr extends ProductAttr {
	public static readonly ALIAS = "dynamic_string";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
