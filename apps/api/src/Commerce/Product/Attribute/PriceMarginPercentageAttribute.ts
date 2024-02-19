import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class PriceMarginPercentageAttribute extends ProductAttr {
	public static readonly ALIAS = "price_margin_percentage";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
