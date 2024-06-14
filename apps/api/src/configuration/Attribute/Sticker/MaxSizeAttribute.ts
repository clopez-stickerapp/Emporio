import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class MaxSizeAttribute extends ProductAttr {
	public static readonly ALIAS = "max_size_mm";

	public static readonly MAX_SIZE_LASER          = 275;
	public static readonly MAX_SIZE_DIGITAL        = 1250;
	public static readonly MAX_SIZE_SHEET_LEGACY   = 300;
	public static readonly MAX_SIZE_ONE_SIDE_LASER = 800;
	public static readonly MAX_SIZE_ROLL           = 980;
	public static readonly MAX_SIZE_TRANSFER_TAPE  = 1130;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );

		this.addAttrValue( MaxSizeAttribute.MAX_SIZE_LASER );
		this.addAttrValue( MaxSizeAttribute.MAX_SIZE_DIGITAL );
		this.addAttrValue( MaxSizeAttribute.MAX_SIZE_SHEET_LEGACY );
		this.addAttrValue( MaxSizeAttribute.MAX_SIZE_ONE_SIDE_LASER );
		this.addAttrValue( MaxSizeAttribute.MAX_SIZE_ROLL );
	}
}
