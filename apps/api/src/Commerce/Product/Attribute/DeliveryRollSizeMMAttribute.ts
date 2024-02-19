import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class DeliveryRollSizeMMAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_size_mm";
	
	public static readonly DEFAULT_VALUE = 76;

	public constructor() {
		super( ProductAttrValueType.INT );

		this.addAttrValue( DeliveryRollSizeMMAttribute.DEFAULT_VALUE );
	}
}
