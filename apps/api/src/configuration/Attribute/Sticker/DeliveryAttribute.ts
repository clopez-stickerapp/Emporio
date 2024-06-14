import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class DeliveryAttribute extends ProductAttr {
	public static readonly ALIAS = "delivery";

	public static readonly DELIVERY_SINGLE = "single";
	public static readonly DELIVERY_SHEET  = "sheet";
	public static readonly DELIVERY_ROLL   = "roll";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( DeliveryAttribute.DELIVERY_SINGLE );
		this.addAttrValue( DeliveryAttribute.DELIVERY_SHEET );
		this.addAttrValue( DeliveryAttribute.DELIVERY_ROLL );
	}
}
