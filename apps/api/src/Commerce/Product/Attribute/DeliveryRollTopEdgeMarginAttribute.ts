import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class DeliveryRollTopEdgeMarginAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_top_edge_margin";

	public static readonly DEFAULT_VALUE = 2;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
