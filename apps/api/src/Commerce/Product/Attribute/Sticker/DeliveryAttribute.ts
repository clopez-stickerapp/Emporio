import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

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
