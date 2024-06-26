export class PromoProductFamily {
	public static readonly NAME = "promo";

	public static readonly PRODUCT_GIFTCARD             = "giftcard";
	public static readonly PRODUCT_UV_LAMP              = "uv_lamp";
	public static readonly PRODUCT_MONSTER_PACK         = "monster_pack";
	public static readonly PRODUCT_MOST_LIKED_PACK_2021 = "most_liked_pack_2021";
	public static readonly PRODUCT_MOST_LIKED_PACK_2022 = "most_liked_pack_2022";
	public static readonly PRODUCT_CREEPY_HEAD_PACK     = "creepy_head_pack";
	public static readonly PRODUCT_SAMPLE_STICKER_PACK  = "sample_sticker_pack";
	public static readonly PRODUCT_MOST_LIKED_PACK_2023 = "most_liked_pack_2023";
	public static readonly PRODUCT_SLAP_PACK            = "slap_pack";
	public static readonly PRODUCT_STICKER_FREEBIE	    = "sticker_freebie";

// 	public constructor( productService: ProductService ) {
// 		super( PromoProductFamily.NAME, 1, productService );

//         this.relateProductPriceProvider( PromoProductPriceProvider.NAME );
// 		this.relateConstraintCollection( PromoProductionConstraintCollection.NAME );

// 		this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.getName() );
// 		this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.getName() );
// 		this.requireAttr( QuantityAttribute.name, QuantityAttribute.getName() );

// 		this.supportAttr( DynamicStringAttr.name, MaterialAttribute.getName() );
// 		this.supportAttr( TemplateAttribute.name, TemplateAttribute.getName() );
// 		this.supportAttr( DynamicStringAttr.name, LaminateAttribute.getName() );
// 		this.supportAttr( HeightAttribute.name, HeightAttribute.getName() );
// 		this.supportAttr( WidthAttribute.name, WidthAttribute.getName() );
// 		this.supportAttr( FigureAttribute.name, FigureAttribute.getName() );
// 		this.supportAttr( ReorderAttribute.name, ReorderAttribute.getName() );
// 		this.supportAttr( ProductionLineAttribute.name, ProductionLineAttribute.getName() );

// 		this.addProduct( PromoProductFamily.PRODUCT_GIFTCARD, "GC-31" )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.GIFTCARD )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );

// 		this.addProduct( PromoProductFamily.PRODUCT_UV_LAMP, "UL-31" )
// 			.withAttrValue( SheetTypeAttribute.getName(), "promo" )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), "uv_lamp" );

// 		this.addProduct( PromoProductFamily.PRODUCT_STICKER_FREEBIE, "SF-31" )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_FREEBIE )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );

// 		this.addProduct( PromoProductFamily.PRODUCT_MONSTER_PACK, 'MP-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_MONSTER_PACK )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );
		
// 		this.addProduct( PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2021, 'MLP21-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2021 )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );

// 		this.addProduct( PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2022, 'MLP22-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2022 )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );

// 		this.addProduct( PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2023, 'MLP23-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2023 )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );
		
// 		this.addProduct( PromoProductFamily.PRODUCT_CREEPY_HEAD_PACK, 'CH-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_CREEPY_HEAD_PACK )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );

// 		this.addProduct( PromoProductFamily.PRODUCT_SAMPLE_STICKER_PACK, 'SP-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_SAMPLE_STICKER_PACK )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );

// 		this.addProduct( PromoProductFamily.PRODUCT_SLAP_PACK, 'SLP-31' )
// 			.withAttrValue( SheetTypeAttribute.getName(), SheetTypeAttribute.STICKER_PACK )
// 			.withAttrValue( StickerSheetNameAttribute.getName(), PromoProductFamily.PRODUCT_SLAP_PACK )
// 			.withAttrValue( MaterialAttribute.getName(), MaterialAttribute.SPECIAL );
// 	}

// 	public calculateUnits( productItem: ProductItem ): number {
// 		return productItem.getAttribute<number>( QuantityAttribute.getName() ) ?? 0;
// 	}
}