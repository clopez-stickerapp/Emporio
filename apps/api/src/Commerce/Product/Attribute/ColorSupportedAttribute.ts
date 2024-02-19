import { ProductAttr } from "../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../Core/Product/Attribute/ProductAttrValueType";

export class ColorSupportedAttribute extends ProductAttr {
	public static readonly ALIAS = "color_supported";

	public constructor() {
		super( ProductAttrValueType.BOOL );

		this.addAttrValue( true );
		this.addAttrValue( false );
	}
}
