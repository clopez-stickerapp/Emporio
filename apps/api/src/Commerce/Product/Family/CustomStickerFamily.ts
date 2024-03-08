import { ProductServiceException } from "../../Core/Exception/ProductServiceException";
import { ProductItem } from "../../Core/Product/Item/ProductItem";
import { ProductFamily } from "../../Core/Product/ProductFamily";
import { ProductService } from "../../Core/ProductService";
import { ChangedAttribute } from "../Attribute/ChangedAttribute";
import { ColorSupportedAttribute } from "../Attribute/ColorSupportedAttribute";
import { DeliveryRollItemMarginAttribute } from "../Attribute/DeliveryRollItemMarginAttribute";
import { DeliveryRollSizeMMAttribute } from "../Attribute/DeliveryRollSizeMMAttribute";
import { DeliveryRollSizeTypeAttribute } from "../Attribute/DeliveryRollSizeTypeAttribute";
import { DeliveryRollTopEdgeMarginAttribute } from "../Attribute/DeliveryRollTopEdgeMarginAttribute";
import { FigureAttribute } from "../Attribute/FigureAttribute";
import { FixedQuantityAttribute } from "../Attribute/FixedQuantityAttribute";
import { FixedSizeAttribute } from "../Attribute/FixedSizeAttribute";
import { HeightAttribute } from "../Attribute/HeightAttribute";
import { ImperialUnitsAttribute } from "../Attribute/ImperialUnitsAttribute";
import { MarketAttribute } from "../Attribute/MarketAttribute";
import { NoteAttribute } from "../Attribute/NoteAttribute";
import { PriceMarginPercentageAttribute } from "../Attribute/PriceMarginPercentageAttribute";
import { QuantityAttribute } from "../Attribute/QuantityAttribute";
import { ReorderAttribute } from "../Attribute/ReorderAttribute";
import { ResellerAttribute } from "../Attribute/ResellerAttribute";
import { SheetTypeSaveAsAttribute } from "../Attribute/SheetTypeSaveAsAttribute";
import { StickerProductionContraintCollection } from "../Attribute/Sticker/Constraint/StickerProductionContraintCollection";
import { CutDirectionAttribute } from "../Attribute/Sticker/CutDirectionAttribute";
import { DeliveryAttribute } from "../Attribute/Sticker/DeliveryAttribute";
import { DeliverySheetHeightAttribute } from "../Attribute/Sticker/DeliverySheetHeightAttribute";
import { DeliverySheetInsidePaddingAttribute } from "../Attribute/Sticker/DeliverySheetInsidePaddingAttribute";
import { DeliverySheetOutsidePaddingAttribute } from "../Attribute/Sticker/DeliverySheetOutsidePaddingAttribute";
import { DeliverySheetWidthAttribute } from "../Attribute/Sticker/DeliverySheetWidthAttribute";
import { EpoxyTemplateAttribute } from "../Attribute/Sticker/EpoxyTemplateAttribute";
import { FeatureAttribute } from "../Attribute/Sticker/FeatureAttribute";
import { StickerWizardFilterCollection } from "../Attribute/Sticker/Filter/StickerWizardFilterCollection";
import { StickerAttributeIconCollection } from "../Attribute/Sticker/Icon/StickerAttributeIconCollection";
import { ImageFiltersAttribute } from "../Attribute/Sticker/ImageFiltersAttribute";
import { InkAttribute } from "../Attribute/Sticker/InkAttribute";
import { InnercutAsKisscutAttribute } from "../Attribute/Sticker/InnercutAsKisscutAttribute";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { MaterialAttribute } from "../Attribute/Sticker/MaterialAttribute";
import { MaterialColorAttribute } from "../Attribute/Sticker/MaterialColorAttribute";
import { MaxSizeAttribute } from "../Attribute/Sticker/MaxSizeAttribute";
import { MaxSizeOtherSideAttribute } from "../Attribute/Sticker/MaxSizeOtherSideAttribute";
import { MinSizeAttribute } from "../Attribute/Sticker/MinSizeAttribute";
import { OutlineAttribute } from "../Attribute/Sticker/OutlineAttribute";
import { ProductionInstructionAttribute } from "../Attribute/Sticker/ProductionInstructionAttribute";
import { ProductionLineAttribute } from "../Attribute/Sticker/ProductionLineAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { SizeAttribute } from "../Attribute/Sticker/SizeAttribute";
import { StickerSheetNameAttribute } from "../Attribute/Sticker/StickerSheetNameAttribute";
import { StickerWizardStockCollection } from "../Attribute/Sticker/Stock/StickerWizardStockCollection";
import { WhiteLayerAttribute } from "../Attribute/Sticker/WhiteLayerAttribute";
import { TemplateAttribute } from "../Attribute/TemplateAttribute";
import { WidthAttribute } from "../Attribute/WidthAttribute";
import { StickerPriceProvider } from "../Price/StickerPriceProvider";
import { StickerQuantityListCollection } from "../Price/StickerQuantityListCollection";

export class CustomStickerFamily extends ProductFamily {
	public static readonly NAME = "custom_sticker";

	public static readonly PRODUCT_DIE_CUT            = "die_cut";
	public static readonly PRODUCT_SINGLE_ON_SHEET    = "single_on_sheet";
	public static readonly PRODUCT_SHEET              = "sheet";
	public static readonly PRODUCT_SHEET_KISS_CUT     = "sheet_kiss_cut";
	public static readonly PRODUCT_SHEET_LEGACY       = "sheet_legacy";
	public static readonly PRODUCT_HANG_TAG           = "hang_tag";
	public static readonly PRODUCT_3D_DOME            = "3d_dome";
	public static readonly PRODUCT_FRONT_ADHESIVE     = "front_adhesive";
	public static readonly PRODUCT_HEAVY_DUTY         = "heavy_duty";
	public static readonly PRODUCT_REMOVABLE          = "removable";
	public static readonly PRODUCT_WALL               = "wall";
	public static readonly PRODUCT_FLOOR              = "floor";
	public static readonly PRODUCT_LAPTOP_SKIN        = "laptop_skin";
	public static readonly PRODUCT_DOUBLE_SIDED       = "double_sided";
	public static readonly PRODUCT_LABELS_ON_SHEET    = "labels_on_sheet";
	public static readonly PRODUCT_LABELS_ON_ROLL     = "labels_on_roll";
	public static readonly PRODUCT_LIBRARY_DESIGN     = "library_design";
	public static readonly PRODUCT_TRANSFER_DECAL     = "transfer_decal";
	public static readonly PRODUCT_WINDOW             = "window";

	public constructor( productService: ProductService ) {
		super( CustomStickerFamily.NAME, 0.1215, productService );

		this.relateConstraintCollection( StickerProductionContraintCollection.NAME );
		this.relateFilterCollection( StickerWizardFilterCollection.NAME );
		this.relateIconCollection( StickerAttributeIconCollection.NAME );
		this.relateProductPriceProvider( StickerPriceProvider.NAME );
		this.relateProductQuantityListCollection( StickerQuantityListCollection.NAME );
		this.relateStockCollection( StickerWizardStockCollection.NAME );

		this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.ALIAS );
		this.requireAttr( MaterialAttribute.name, MaterialAttribute.ALIAS );
		this.requireAttr( LaminateAttribute.name, LaminateAttribute.ALIAS );
		this.requireAttr( HeightAttribute.name, HeightAttribute.ALIAS );
		this.requireAttr( WidthAttribute.name, WidthAttribute.ALIAS );
		this.requireAttr( QuantityAttribute.name, QuantityAttribute.ALIAS );

		this.supportAttr( PriceMarginPercentageAttribute.name, PriceMarginPercentageAttribute.ALIAS );
		this.supportAttr( ChangedAttribute.name, ChangedAttribute.ALIAS );
		this.supportAttr( FigureAttribute.name, FigureAttribute.ALIAS );
		this.supportAttr( ReorderAttribute.name, ReorderAttribute.ALIAS );
		this.supportAttr( NoteAttribute.name, NoteAttribute.ALIAS );
		this.supportAttr( SheetTypeSaveAsAttribute.name, SheetTypeSaveAsAttribute.ALIAS );
		this.supportAttr( StickerSheetNameAttribute.name, StickerSheetNameAttribute.ALIAS );
		this.supportAttr( TemplateAttribute.name, TemplateAttribute.ALIAS );
		this.supportAttr( SizeAttribute.name, SizeAttribute.ALIAS );
		this.supportAttr( ImperialUnitsAttribute.name, ImperialUnitsAttribute.ALIAS );
		this.supportAttr( FeatureAttribute.name, FeatureAttribute.ALIAS );
		this.supportAttr( ProductionLineAttribute.name, ProductionLineAttribute.ALIAS );
		this.supportAttr( ProductionInstructionAttribute.name, ProductionInstructionAttribute.ALIAS );
		this.supportAttr( DeliveryAttribute.name, DeliveryAttribute.ALIAS );
		this.supportAttr( DeliverySheetWidthAttribute.name, DeliverySheetWidthAttribute.ALIAS );
		this.supportAttr( DeliverySheetHeightAttribute.name, DeliverySheetHeightAttribute.ALIAS );
		this.supportAttr( DeliverySheetInsidePaddingAttribute.name, DeliverySheetInsidePaddingAttribute.ALIAS );
		this.supportAttr( DeliverySheetOutsidePaddingAttribute.name, DeliverySheetOutsidePaddingAttribute.ALIAS );
		this.supportAttr( EpoxyTemplateAttribute.name, EpoxyTemplateAttribute.ALIAS );
		this.supportAttr( InnercutAsKisscutAttribute.name, InnercutAsKisscutAttribute.ALIAS );
		this.supportAttr( WhiteLayerAttribute.name, WhiteLayerAttribute.ALIAS );
		this.supportAttr( CutDirectionAttribute.name, CutDirectionAttribute.ALIAS );
		this.supportAttr( ImageFiltersAttribute.name, ImageFiltersAttribute.ALIAS );
		this.supportAttr( OutlineAttribute.name, OutlineAttribute.ALIAS );
		this.supportAttr( InkAttribute.name, InkAttribute.ALIAS );
		this.supportAttr( ResellerAttribute.name, ResellerAttribute.ALIAS );
		this.supportAttr( MaxSizeAttribute.name, MaxSizeAttribute.ALIAS );
		this.supportAttr( MaxSizeOtherSideAttribute.name, MaxSizeOtherSideAttribute.ALIAS );
		this.supportAttr( MinSizeAttribute.name, MinSizeAttribute.ALIAS );
		this.supportAttr( FixedSizeAttribute.name, FixedSizeAttribute.ALIAS );
		this.supportAttr( FixedQuantityAttribute.name, FixedQuantityAttribute.ALIAS );
		this.supportAttr( MaterialColorAttribute.name, MaterialColorAttribute.ALIAS );
		this.supportAttr( ColorSupportedAttribute.name, ColorSupportedAttribute.ALIAS );
		this.supportAttr( MarketAttribute.name, MarketAttribute.ALIAS );
		this.supportAttr( DeliveryRollSizeTypeAttribute.name, DeliveryRollSizeTypeAttribute.ALIAS );
		this.supportAttr( DeliveryRollSizeMMAttribute.name, DeliveryRollSizeMMAttribute.ALIAS );
		this.supportAttr( DeliveryRollTopEdgeMarginAttribute.name, DeliveryRollTopEdgeMarginAttribute.ALIAS );
		this.supportAttr( DeliveryRollItemMarginAttribute.name, DeliveryRollItemMarginAttribute.ALIAS );

		/**
		 * Dummy example skus for now. We should have some kind of SKU management system in place.
		 * https://www.3p-logistics.co.uk/3pl-blog/guide-to-sku-management-ecommerce-best-practices/
		 */

		this.addProduct( CustomStickerFamily.PRODUCT_DIE_CUT, 'DCRS-108' )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false ) // TODO: Remove. Just while testing the sticker wizard to editor connection
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_SHEET_LEGACY, 'SLSTS-108' )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, [
				StickerSheetNameAttribute.SHEET,
				StickerSheetNameAttribute.TEMPLATE,
				StickerSheetNameAttribute.STICKER
			] )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SHEET )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_SHEET, 'SRR-108' )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, [
				StickerSheetNameAttribute.RECTANGLE,
				StickerSheetNameAttribute.ROUNDED
			] )
			.withAttrValue( InnercutAsKisscutAttribute.ALIAS, "yes" )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SHEET )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_SHEET_KISS_CUT, 'SKCRR-108' )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, [
				StickerSheetNameAttribute.RECTANGLE,
				StickerSheetNameAttribute.ROUNDED
			] )
			.withAttrValue( InnercutAsKisscutAttribute.ALIAS, "yes" )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SHEET )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_LABELS_ON_SHEET, 'LOSSDS-108' )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SHEET )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_LABELS_ON_ROLL, 'LORSDR-108' )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_ROLL )
			.withAttrValue( CutDirectionAttribute.ALIAS, CutDirectionAttribute.RIGHT_FIRST, false )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_HANG_TAG, 'HTSH-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.withAttrValue( FeatureAttribute.ALIAS, [
				FeatureAttribute.HANGTAGGING 
			], true, false )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_3D_DOME, '3DDSRDSE-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.ROUND, false )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SHEET, false )
			.withAttrValue( LaminateAttribute.ALIAS, LaminateAttribute.EPOXY )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_FRONT_ADHESIVE, 'FASC-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.CLEAR )
			.withAttrValue( WhiteLayerAttribute.ALIAS, WhiteLayerAttribute.MANUALLY )
			.withAttrValue( LaminateAttribute.ALIAS, [
				LaminateAttribute.GLOSSY_UV,
				LaminateAttribute.SOFT_TOUCH
			] )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_HEAVY_DUTY, 'HDSWHTGUMHD-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE, false )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.WHITE_HI_TACK, false )
			.withAttrValue( LaminateAttribute.ALIAS, LaminateAttribute.GLOSSY_UV_12_MIL_HEAVY_DUTY )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_REMOVABLE, 'RSWR-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.WHITE_REMOVABLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_WALL, 'WSUCWW-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE, false )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.CONTOUR, false )
			.withAttrValue( LaminateAttribute.ALIAS, LaminateAttribute.UNCOATED, false )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.WHITE_WALL )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_FLOOR, 'FS-115' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_LAPTOP_SKIN, 'LSSSS-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SKIN )
			.withAttrValue( MaterialAttribute.ALIAS, MaterialAttribute.SKIN )
			.withAttrValue( LaminateAttribute.ALIAS, LaminateAttribute.SANDY, false )
			.setStock();

		// TODO: Is this a "double sided sticker"? With backpaper print?
		this.addProduct( CustomStickerFamily.PRODUCT_DOUBLE_SIDED, 'DSS-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_LIBRARY_DESIGN, 'LDSDSI-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( StickerSheetNameAttribute.ALIAS, StickerSheetNameAttribute.STICKER_INDIVIDUAL )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_TRANSFER_DECAL, 'TDTTDSS-108' )
			.withAttrValue( FeatureAttribute.ALIAS, [
				FeatureAttribute.TRANSFER_TAPE
			], true, false )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SHEET, false )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE, false )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_WINDOW, 'WS-108' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.setStock();

		this.addProduct( CustomStickerFamily.PRODUCT_SINGLE_ON_SHEET, 'HSOS-80085' )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SINGLE )
			.withAttrValue( DeliveryAttribute.ALIAS, DeliveryAttribute.DELIVERY_SHEET )
			.setStock();
	}

	public getMinimumQuantity( productItem: ProductItem ): number {
		if ( productItem.getAttribute( StickerSheetNameAttribute.ALIAS ) == StickerSheetNameAttribute.STICKER_INDIVIDUAL ) {
			return 1;
		}

		const units = this.calculateUnits( productItem );

		if ( units == 0 ) {
			throw new ProductServiceException( `Cannot get minimum quantity. Units is set to ${ units } on item: ${ JSON.stringify( productItem ) }` );
		}

		const quantity = productItem.getAttribute<number>( QuantityAttribute.ALIAS );

		if ( !quantity ) {
			throw new ProductServiceException( `Cannot get minimum quantity. Quantity is set to ${ quantity } on item: ${ JSON.stringify( productItem ) }` );
		}

		return Math.ceil( this.getMinimumUnits( productItem ) / ( units / quantity ) );
	}

	public calculateUnits( productItem: ProductItem ): number {
		let widthMM = parseInt( productItem.getAttribute( WidthAttribute.ALIAS ) ?? '0' );
		let heightMM = parseInt( productItem.getAttribute( HeightAttribute.ALIAS ) ?? '0' );
		let quantity = parseInt( productItem.getAttribute( QuantityAttribute.ALIAS ) ?? '0' );

		if ( quantity <= 0 ) {
			quantity = 1;
			productItem.setAttribute( QuantityAttribute.ALIAS, quantity );
		}

		return ( widthMM * heightMM * quantity ) / 1000000;
	}

	public validateUnits( productItem: ProductItem ): boolean {
		let units = this.calculateUnits( productItem );
		let minUnits = this.getMinimumUnits( productItem );

		// Use minimum units if units is lower than minimum
		if ( units < minUnits && productItem.getAttribute( StickerSheetNameAttribute.ALIAS ) != StickerSheetNameAttribute.STICKER_INDIVIDUAL ) {
			productItem.setUnits( minUnits );
		} else {
			productItem.setUnits( units );
		}

		return true;
	}
}
