import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliverySheetInsidePaddingAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_inside_padding";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
