import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class SizeAttribute extends ProductAttr {
	public static readonly ALIAS = "size";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
