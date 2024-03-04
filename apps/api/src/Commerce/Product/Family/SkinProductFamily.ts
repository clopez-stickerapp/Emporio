import { ProductItem } from "../../Core/Product/Item/ProductItem";
import { ProductFamily } from "../../Core/Product/ProductFamily";
import { ProductService } from "../../Core/ProductService";
import { ChangedAttribute } from "../Attribute/ChangedAttribute";
import { DynamicStringAttr } from "../Attribute/DynamicStringAttr";
import { FigureAttribute } from "../Attribute/FigureAttribute";
import { HeightAttribute } from "../Attribute/HeightAttribute";
import { ImperialUnitsAttribute } from "../Attribute/ImperialUnitsAttribute";
import { PriceMarginPercentageAttribute } from "../Attribute/PriceMarginPercentageAttribute";
import { QuantityAttribute } from "../Attribute/QuantityAttribute";
import { ReorderAttribute } from "../Attribute/ReorderAttribute";
import { ResellerAttribute } from "../Attribute/ResellerAttribute";
import { SheetTypeSaveAsAttribute } from "../Attribute/SheetTypeSaveAsAttribute";
import { SkinFilterCollection } from "../Attribute/Skin/Filter/SkinFilterCollection";
import { StickerProductionContraintCollection } from "../Attribute/Sticker/Constraint/StickerProductionContraintCollection";
import { FeatureAttribute } from "../Attribute/Sticker/FeatureAttribute";
import { StickerWizardFilterCollection } from "../Attribute/Sticker/Filter/StickerWizardFilterCollection";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { MaterialAttribute } from "../Attribute/Sticker/MaterialAttribute";
import { ProductionLineAttribute } from "../Attribute/Sticker/ProductionLineAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { StickerSheetNameAttribute } from "../Attribute/Sticker/StickerSheetNameAttribute";
import { TemplateAttribute } from "../Attribute/TemplateAttribute";
import { WidthAttribute } from "../Attribute/WidthAttribute";
import { StickerQuantityListCollection } from "../Price/StickerQuantityListCollection";

export class SkinProductFamily extends ProductFamily {
	public static readonly NAME = "skin";

	public static readonly PRODUCT_CUSTOM_SKIN = "custom_skin";

	public constructor( productService: ProductService ) {
		super( SkinProductFamily.NAME, 1, productService );

		this.relateProductPriceProvider( SkinPriceProvider.NAME );

		this.relateFilterCollection( SkinFilterCollection.NAME );
		this.relateConstraintCollection( StickerProductionContraintCollection.NAME );
		this.relateProductQuantityListCollection( StickerQuantityListCollection.NAME );
		this.relateFilterCollection( StickerWizardFilterCollection.NAME );

		this.requireAttr( SheetTypeAttribute.name, SheetTypeAttribute.ALIAS );
		this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.ALIAS );
		this.requireAttr( TemplateAttribute.name, TemplateAttribute.ALIAS );
		this.requireAttr( MaterialAttribute.name, MaterialAttribute.ALIAS );
		this.requireAttr( LaminateAttribute.name, LaminateAttribute.ALIAS );
		this.requireAttr( QuantityAttribute.name, QuantityAttribute.ALIAS );

		this.supportAttr( FeatureAttribute.name, FeatureAttribute.ALIAS );
		this.supportAttr( HeightAttribute.name, HeightAttribute.ALIAS );
		this.supportAttr( WidthAttribute.name, WidthAttribute.ALIAS );
		this.supportAttr( ImperialUnitsAttribute.name, ImperialUnitsAttribute.ALIAS );
		this.supportAttr( PriceMarginPercentageAttribute.name, PriceMarginPercentageAttribute.ALIAS );
		this.supportAttr( ChangedAttribute.name, ChangedAttribute.ALIAS );
		this.supportAttr( FigureAttribute.name, FigureAttribute.ALIAS );
		this.supportAttr( ReorderAttribute.name, ReorderAttribute.ALIAS );
		this.supportAttr( SheetTypeSaveAsAttribute.name, SheetTypeSaveAsAttribute.ALIAS );
		this.supportAttr( ProductionLineAttribute.name, ProductionLineAttribute.ALIAS );
		this.supportAttr( ResellerAttribute.name, ResellerAttribute.ALIAS );

		this.addProduct( SkinProductFamily.PRODUCT_CUSTOM_SKIN, "CS-32" )
			.withAttrValue( SheetTypeAttribute.ALIAS, SheetTypeAttribute.SKIN );
	}

	public validateUnits( productItem: ProductItem ): boolean {
		productItem.setUnits( parseInt( productItem.getAttribute( QuantityAttribute.ALIAS ) ?? '0' ) );
		return true;
	}
}
