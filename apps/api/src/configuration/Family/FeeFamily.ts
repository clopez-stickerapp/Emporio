import { ProductItem } from "$/product/ProductItem";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "../../product/ProductService";
import { DynamicStringAttr } from "../Attribute/DynamicStringAttr";
import { QuantityAttribute } from "../Attribute/QuantityAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { StickerSheetNameAttribute } from "../Attribute/Sticker/StickerSheetNameAttribute";
import { TextAttribute } from "../Attribute/TextAttribute";

export class FeeFamily extends ProductFamily {
	public static readonly NAME = "fee";

	public static readonly PRODUCT_CUSTOM_FEE = "custom_fee";

	public constructor( ps: ProductService ) {
		super( FeeFamily.NAME, 1, ps );

		this.requireAttr( TextAttribute.name, TextAttribute.ALIAS );
		this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.ALIAS );
		this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.ALIAS );
		this.requireAttr( QuantityAttribute.name, QuantityAttribute.ALIAS );

		this.addProduct( FeeFamily.PRODUCT_CUSTOM_FEE, "fee12" )
			.withAttrValue( QuantityAttribute.ALIAS, 1 )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, "text" )
			.withAttrValue( SheetTypeAttribute.ALIAS, "text" );
	}

	public calculateUnits(productItem: ProductItem): number {
		return productItem.getAttribute<number>( QuantityAttribute.ALIAS ) ?? 0;
	}
}