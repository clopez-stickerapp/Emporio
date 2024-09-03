export class FeeFamily {
	public static readonly NAME = "fee";

	public static readonly PRODUCT_CUSTOM_FEE = "custom_fee";

	// public constructor( ps: ProductService ) {
	// 	super( FeeFamily.NAME, 1, ps );

	// 	this.requireAttr( TextAttribute.name, TextAttribute.getName() );
	// 	this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.getName() );
	// 	this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.getName() );
	// 	this.requireAttr( QuantityAttribute.name, QuantityAttribute.getName() );

	// 	this.addProduct( FeeFamily.PRODUCT_CUSTOM_FEE, "fee12" )
	// 		.withAttrValue( QuantityAttribute.getName(), 1 )
	// 		.withAttrValue( StickerSheetNameAttribute.getName(), "text" )
	// 		.withAttrValue( SheetTypeAttribute.getName(), "text" );
	// }

	// public calculateUnits(productItem: ProductItem): number {
	// 	return productItem.getAttribute<number>( QuantityAttribute.getName() ) ?? 0;
	// }
}
