import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliveryRollItemMarginAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_item_margin";

	public static readonly DEFAULT_VALUE = 4;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
