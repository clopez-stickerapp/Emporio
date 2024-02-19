import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class DeliverySheetInsidePaddingAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_sheet_inside_padding";

	public constructor() {
		super( ProductAttrValueType.INT, false, true );
	}
}
