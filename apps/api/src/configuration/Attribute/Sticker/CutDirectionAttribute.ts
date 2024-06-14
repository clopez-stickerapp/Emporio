import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class CutDirectionAttribute extends ProductAttr {
	public static readonly ALIAS = "cut_direction";

	public static readonly AUTO         = "auto";
	public static readonly BOTTOM_FIRST = "bottom_first";
	public static readonly TOP_FIRST    = "top_first";
	public static readonly LEFT_FIRST   = "left_first";
	public static readonly RIGHT_FIRST  = "right_first";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( CutDirectionAttribute.AUTO );
		this.addAttrValue( CutDirectionAttribute.BOTTOM_FIRST );
		this.addAttrValue( CutDirectionAttribute.TOP_FIRST );
		this.addAttrValue( CutDirectionAttribute.RIGHT_FIRST );
		this.addAttrValue( CutDirectionAttribute.LEFT_FIRST );
	}
}
