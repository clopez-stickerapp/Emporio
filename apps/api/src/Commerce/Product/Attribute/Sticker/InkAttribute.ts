import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class InkAttribute extends ProductAttr {
	public static readonly ALIAS = "ink";

	public static readonly PINK_INK      = "pink_ink";
	public static readonly INVISIBLE_INK = "invisible_ink";

	public static readonly OUT_OF_STOCK = [ 
		InkAttribute.PINK_INK, 
		InkAttribute.INVISIBLE_INK 
	];

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( InkAttribute.PINK_INK );
		this.addAttrValue( InkAttribute.INVISIBLE_INK );
	}
}
