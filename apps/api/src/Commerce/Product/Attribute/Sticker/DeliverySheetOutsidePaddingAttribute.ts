import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class DeliverySheetOutsidePaddingAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_outside_padding";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
