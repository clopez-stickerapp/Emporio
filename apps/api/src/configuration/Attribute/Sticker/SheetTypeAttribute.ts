import { ProductAttr } from "$/product/attribute/ProductAttr";
import { ProductAttrValueType } from "$/product/attribute/ProductAttrValueType";

export class SheetTypeAttribute extends ProductAttr {
	public static readonly ALIAS = "sheet_type";

	public static readonly SINGLE       = "single";
	public static readonly SHEET        = "sheet";
	public static readonly SKIN         = "skin";
	public static readonly DIE_CUT      = "die_cut";
	public static readonly GIFTCARD     = "giftcard";
	public static readonly STICKER_PACK = "sticker_pack";
	public static readonly STICKER_FREEBIE = "sticker_freebie";

	public constructor() {
		super( ProductAttrValueType.STRING, false, true );

		this.addAttrValue( SheetTypeAttribute.SINGLE );
		this.addAttrValue( SheetTypeAttribute.SHEET );
		this.addAttrValue( SheetTypeAttribute.SKIN );
		this.addAttrValue( SheetTypeAttribute.DIE_CUT );
		this.addAttrValue( SheetTypeAttribute.GIFTCARD );
		this.addAttrValue( SheetTypeAttribute.STICKER_PACK );
	}
}
