import { ProductAttr } from "../../../Core/Product/Attribute/ProductAttr";
import { ProductAttrValueType } from "../../../Core/Product/Attribute/ProductAttrValueType";

export class StickerSheetNameAttribute extends ProductAttr {
	public static readonly ALIAS = "sheet_name";

	public static readonly CONTOUR            = "path";
	public static readonly SQUARE             = "square";
	public static readonly RECTANGLE          = "rect";
	public static readonly ROUND              = "circle";
	public static readonly OVAL               = "oval";
	public static readonly ROUNDED            = "rounded";
	public static readonly STICKER_INDIVIDUAL = "sticker_individual";
	public static readonly STICKER            = "sticker";
	public static readonly SHEET              = "sheet";
	public static readonly TEMPLATE           = "template";
	public static readonly MANUAL             = "manual";

	public constructor() {
		super( ProductAttrValueType.STRING );

		this.addAttrValue( StickerSheetNameAttribute.RECTANGLE );
		this.addAttrValue( StickerSheetNameAttribute.CONTOUR );
		this.addAttrValue( StickerSheetNameAttribute.ROUND );
		this.addAttrValue( StickerSheetNameAttribute.ROUNDED );
		this.addAttrValue( StickerSheetNameAttribute.STICKER_INDIVIDUAL );
		this.addAttrValue( StickerSheetNameAttribute.STICKER );
		this.addAttrValue( StickerSheetNameAttribute.SHEET );
		this.addAttrValue( StickerSheetNameAttribute.TEMPLATE );
		this.addAttrValue( StickerSheetNameAttribute.MANUAL );
	}
}
