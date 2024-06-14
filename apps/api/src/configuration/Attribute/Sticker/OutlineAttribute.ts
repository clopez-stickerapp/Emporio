import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class OutlineAttribute extends ProductAttr {
	public static readonly ALIAS = "outline";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );
	}
}
