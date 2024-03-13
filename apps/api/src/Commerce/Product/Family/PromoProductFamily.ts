import { ProductItem } from "../../Core/Product/Item/ProductItem";
import { ProductFamily } from "../../Core/Product/ProductFamily";
import { ProductService } from "../../Core/ProductService";
import { DynamicStringAttr } from "../Attribute/DynamicStringAttr";
import { FigureAttribute } from "../Attribute/FigureAttribute";
import { HeightAttribute } from "../Attribute/HeightAttribute";
import { QuantityAttribute } from "../Attribute/QuantityAttribute";
import { ReorderAttribute } from "../Attribute/ReorderAttribute";
import { PromoProductionConstraintCollection } from "../Attribute/Sticker/Constraint/PromoProductionConstraintCollection";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { MaterialAttribute } from "../Attribute/Sticker/MaterialAttribute";
import { ProductionLineAttribute } from "../Attribute/Sticker/ProductionLineAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { StickerSheetNameAttribute } from "../Attribute/Sticker/StickerSheetNameAttribute";
import { TemplateAttribute } from "../Attribute/TemplateAttribute";
import { WidthAttribute } from "../Attribute/WidthAttribute";
import { PromoProductPriceProvider } from "../Price/PromoProductPriceProvider";

export class PromoProductFamily extends ProductFamily {
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

	public constructor( productService: ProductService ) {
		super( PromoProductFamily.NAME, 1, productService );

        this.relateProductPriceProvider( PromoProductPriceProvider.NAME );
		this.relateConstraintCollection( PromoProductionConstraintCollection.NAME );

		this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.ALIAS );
		this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.ALIAS );
		this.requireAttr( QuantityAttribute.name, QuantityAttribute.ALIAS );

		this.supportAttr( DynamicStringAttr.name, MaterialAttribute.ALIAS );
		this.supportAttr( TemplateAttribute.name, TemplateAttribute.ALIAS );
		this.supportAttr( DynamicStringAttr.name, LaminateAttribute.ALIAS );
		this.supportAttr( HeightAttribute.name, HeightAttribute.ALIAS );
		this.supportAttr( WidthAttribute.name, WidthAttribute.ALIAS );
		this.supportAttr( FigureAttribute.name, FigureAttribute.ALIAS );
		this.supportAttr( ReorderAttribute.name, ReorderAttribute.ALIAS );
		this.supportAttr( ProductionLineAttribute.name, ProductionLineAttribute.ALIAS );

		this.addProduct( PromoProductFamily.PRODUCT_GIFTCARD, "GC-31" )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.GIFTCARD )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );

		this.addProduct( PromoProductFamily.PRODUCT_UV_LAMP, "UL-31" )
			.withAttrValue( SheetTypeAttribute.ALIAS, "promo" )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, "uv_lamp" );

		this.addProduct( PromoProductFamily.PRODUCT_MONSTER_PACK, 'MP-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_MONSTER_PACK )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );
		
		this.addProduct( PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2021, 'MLP21-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2021 )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );

		this.addProduct( PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2022, 'MLP22-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2022 )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );

		this.addProduct( PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2023, 'MLP23-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_MOST_LIKED_PACK_2023 )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );
		
		this.addProduct( PromoProductFamily.PRODUCT_CREEPY_HEAD_PACK, 'CH-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_CREEPY_HEAD_PACK )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );

		this.addProduct( PromoProductFamily.PRODUCT_SAMPLE_STICKER_PACK, 'SP-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_SAMPLE_STICKER_PACK )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );

		this.addProduct( PromoProductFamily.PRODUCT_SLAP_PACK, 'SLP-31' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.STICKER_PACK )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, PromoProductFamily.PRODUCT_SLAP_PACK )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SPECIAL );
	}

	public calculateUnits( productItem: ProductItem ): number {
		return productItem.getAttribute<number>( QuantityAttribute.ALIAS ) ?? 0;
	}
}