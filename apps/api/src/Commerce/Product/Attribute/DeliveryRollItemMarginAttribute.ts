
import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class DeliveryRollItemMarginAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_item_margin";

	public static readonly DEFAULT_VALUE = 4;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
