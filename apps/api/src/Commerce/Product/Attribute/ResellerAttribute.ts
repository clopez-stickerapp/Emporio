import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class ResellerAttribute extends ProductAttr {
	public static readonly ALIAS = "reseller";

	public static readonly VALUE_STICKERAPP        = "stickerapp";
	public static readonly VALUE_STICKERSTHATSTICK = "stickersthatstick";
	public static readonly VALUE_STICKIT           = "stickit";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( ResellerAttribute.VALUE_STICKERAPP );
		this.addAttrValue( ResellerAttribute.VALUE_STICKERSTHATSTICK );
		this.addAttrValue( ResellerAttribute.VALUE_STICKIT );
	}
}
