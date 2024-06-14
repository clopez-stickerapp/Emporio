import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliverySheetWidthAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_width";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
