import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class ColorSupportedAttribute extends ProductAttr {
	public static readonly ALIAS = "color_supported";

	public constructor() {
		super( ProductAttrValueType.BOOL );

		this.addAttrValue( true );
		this.addAttrValue( false );
	}
}
