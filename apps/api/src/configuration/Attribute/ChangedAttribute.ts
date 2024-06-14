import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ChangedAttribute extends ProductAttr {
	public static readonly ALIAS = "changed";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
