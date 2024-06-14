import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliveryRollSizeMMAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery_roll_size_mm";
	
	public static readonly DEFAULT_VALUE = 76;

	public constructor() {
		super( ProductAttrValueType.INT );

		this.addAttrValue( DeliveryRollSizeMMAttribute.DEFAULT_VALUE );
	}
}
