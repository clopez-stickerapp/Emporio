import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliverySheetOutsidePaddingAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_outside_padding";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
