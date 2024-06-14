import { ProductItem } from "$/product/ProductItem";
import { ProductFamily } from "$/product/ProductFamily";
import { ProductService } from "../../product/ProductService";
import { ChangedAttribute } from "../Attribute/ChangedAttribute";
import { DynamicStringAttr } from "../Attribute/DynamicStringAttr";
import { FigureAttribute } from "../Attribute/FigureAttribute";
import { HeightAttribute } from "../Attribute/HeightAttribute";
import { ImperialUnitsAttribute } from "../Attribute/ImperialUnitsAttribute";
import { CaseMaterialAttr } from "../Attribute/PhoneCase/CaseMaterialAttr";
import { CaseSheetTypeAttr } from "../Attribute/PhoneCase/CaseSheetTypeAttr";
import { PriceMarginPercentageAttribute } from "../Attribute/PriceMarginPercentageAttribute";
import { QuantityAttribute } from "../Attribute/QuantityAttribute";
import { ReorderAttribute } from "../Attribute/ReorderAttribute";
import { ResellerAttribute } from "../Attribute/ResellerAttribute";
import { SheetTypeSaveAsAttribute } from "../Attribute/SheetTypeSaveAsAttribute";
import { LaminateAttribute } from "../Attribute/Sticker/LaminateAttribute";
import { SheetTypeAttribute } from "../Attribute/Sticker/SheetTypeAttribute";
import { StickerSheetNameAttribute } from "../Attribute/Sticker/StickerSheetNameAttribute";
import { TemplateAttribute } from "../Attribute/TemplateAttribute";
import { WidthAttribute } from "../Attribute/WidthAttribute";

export class PhoneCaseProductFamily extends ProductFamily {
	public static readonly NAME = "phone_case";

	public static readonly PRODUCT_CUSTOM_CASE = "custom_phone_case";

	public constructor( productService: ProductService ) {
		super( PhoneCaseProductFamily.NAME, 1, productService );

		this.requireAttr( CaseSheetTypeAttr.name, CaseSheetTypeAttr.ALIAS );
		this.requireAttr( DynamicStringAttr.name, StickerSheetNameAttribute.ALIAS );
		this.requireAttr( TemplateAttribute.name, TemplateAttribute.ALIAS );
		this.requireAttr( CaseMaterialAttr.name, CaseMaterialAttr.ALIAS );
		this.requireAttr( QuantityAttribute.name, QuantityAttribute.ALIAS );

		this.supportAttr( HeightAttribute.name, HeightAttribute.ALIAS );
		this.supportAttr( WidthAttribute.name, WidthAttribute.ALIAS );
		this.supportAttr( ImperialUnitsAttribute.name, ImperialUnitsAttribute.ALIAS );
		this.supportAttr( PriceMarginPercentageAttribute.name, PriceMarginPercentageAttribute.ALIAS );
		this.supportAttr( ChangedAttribute.name, ChangedAttribute.ALIAS );
		this.supportAttr( FigureAttribute.name, FigureAttribute.ALIAS );
		this.supportAttr( ReorderAttribute.name, ReorderAttribute.ALIAS );
		this.supportAttr( SheetTypeSaveAsAttribute.name, SheetTypeSaveAsAttribute.ALIAS );
		this.supportAttr( ResellerAttribute.name, ResellerAttribute.ALIAS );
		this.supportAttr( DynamicStringAttr.name, LaminateAttribute.ALIAS ); // Fulfix. Shouldn't really support laminate. But have consequences when editor tries to validate the product item if removed.

		this.addProduct( PhoneCaseProductFamily.PRODUCT_CUSTOM_CASE, "c123" )
			.withAttrValue( SheetTypeAttribute.ALIAS, "case" );
	}

	public calculateUnits( productItem: ProductItem ): number {
		return productItem.getAttribute<number>( QuantityAttribute.ALIAS ) ?? 0;
	}
}
