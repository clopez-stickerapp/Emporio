import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class QuantityAttribute extends ProductAttr {
	public static readonly ALIAS = "quantity";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
