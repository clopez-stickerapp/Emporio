import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliveryRollTopEdgeMarginAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_top_edge_margin";

	public static readonly DEFAULT_VALUE = 2;

	public constructor() {
		super( ProductAttrValueType.FLOAT, false, true );
	}
}
