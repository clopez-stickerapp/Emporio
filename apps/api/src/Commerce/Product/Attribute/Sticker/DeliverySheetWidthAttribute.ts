import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class DeliverySheetWidthAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_width";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
