import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class MinSizeAttribute extends ProductAttr {
	public static readonly ALIAS = "min_size_mm";

	public static readonly MIN_SIZE_SPECIAL_STS        = 6;
	public static readonly MIN_SIZE_DEFAULT            = 25;
	public static readonly MIN_SIZE_BIGGER             = 150;
	public static readonly MIN_SIZE_SHEET_CUSTOMIZABLE = 50;
	public static readonly MIN_SIZE_SHEET_LEGACY       = 200;
	public static readonly MIN_SIZE_ADMIN              = 5;
	public static readonly MIN_SIZE_STICKER_ON_SHEET   = 10;

	public constructor() {
		super( ProductAttrValueType.INT, false, true );

		// TODO: Can we remove this special?
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_SPECIAL_STS );
		// TODO: Can we do minimum size 20 mm for all materials?
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_DEFAULT );
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_BIGGER );
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_SHEET_CUSTOMIZABLE );
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_SHEET_LEGACY );
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_ADMIN );
		this.addAttrValue( MinSizeAttribute.MIN_SIZE_STICKER_ON_SHEET );
	}
}
