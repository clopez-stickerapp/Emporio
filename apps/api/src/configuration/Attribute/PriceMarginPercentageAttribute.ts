import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class PriceMarginPercentageAttribute extends ProductAttr {
	public static readonly ALIAS = "price_margin_percentage";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
