import { ProductItem } from "../../Core/Product/Item/ProductItem";
import { ProductFamily } from "../../Core/Product/ProductFamily";
import { ProductService } from "../../Core/ProductService";
import { DynamicStringAttr } from "../Attribute/DynamicStringAttr";
import { QuantityAttribute } from "../Attribute/QuantityAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { StickerSheetNameAttribute } from "../Attribute/Sticker/StickerSheetNameAttribute";

export class FeeFamily extends ProductFamily {
	public static readonly NAME = "fee";

	public static readonly PRODUCT_CUSTOM_FEE = "custom_fee";

	public constructor( ps: ProductService ) {
		super( FeeFamily.NAME, 1, ps );

		this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.ALIAS );
		this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.ALIAS );
		this.requireAttr( QuantityAttribute.name, QuantityAttribute.ALIAS );

		this.addProduct( FeeFamily.PRODUCT_CUSTOM_FEE, "fee12" )
			.withAttrValue( QuantityAttribute.ALIAS, 1 )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, "text" )
			.withAttrValue( SheetTypeAttribute.ALIAS, "text" );
	}

	public validateUnits( productItem: ProductItem ): boolean {
		productItem.setUnits( parseInt( productItem.getAttribute( QuantityAttribute.ALIAS ) ?? '0' ) );

		return true;
	}
}
