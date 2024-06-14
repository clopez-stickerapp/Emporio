import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliverySheetHeightAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_height";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
