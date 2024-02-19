import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class ChangedAttribute extends ProductAttr {
	public static readonly ALIAS = "changed";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
