import { ProductService } from "../Core/ProductService";
import { ChangedAttribute } from "./Attribute/ChangedAttribute";
import { ColorSupportedAttribute } from "./Attribute/ColorSupportedAttribute";
import { DeliveryRollItemMarginAttribute } from "./Attribute/DeliveryRollItemMarginAttribute";
import { DeliveryRollSizeMMAttribute } from "./Attribute/DeliveryRollSizeMMAttribute";
import { DeliveryRollSizeTypeAttribute } from "./Attribute/DeliveryRollSizeTypeAttribute";
import { DeliveryRollTopEdgeMarginAttribute } from "./Attribute/DeliveryRollTopEdgeMarginAttribute";
import { DynamicStringAttr } from "./Attribute/DynamicStringAttr";
import { EffectLayerFileAppIdAttribute } from "./Attribute/EffectLayerFileAppIdAttribute";
import { EffectLayerFileNameDataAttribute } from "./Attribute/EffectLayerFileNameDataAttribute";
import { FigureAttribute } from "./Attribute/FigureAttribute";
import { FixedQuantityAttribute } from "./Attribute/FixedQuantityAttribute";
import { FixedSizeAttribute } from "./Attribute/FixedSizeAttribute";
import { HeightAttribute } from "./Attribute/HeightAttribute";
import { ImperialUnitsAttribute } from "./Attribute/ImperialUnitsAttribute";
import { MarketAttribute } from "./Attribute/MarketAttribute";
import { NoteAttribute } from "./Attribute/NoteAttribute";
import { CaseMaterialAttr } from "./Attribute/PhoneCase/CaseMaterialAttr";
import { CaseSheetTypeAttr } from "./Attribute/PhoneCase/CaseSheetTypeAttr";
import { PriceMarginPercentageAttribute } from "./Attribute/PriceMarginPercentageAttribute";
import { QuantityAttribute } from "./Attribute/QuantityAttribute";
import { ReorderAttribute } from "./Attribute/ReorderAttribute";
import { ResellerAttribute } from "./Attribute/ResellerAttribute";
import { SheetTypeSaveAsAttribute } from "./Attribute/SheetTypeSaveAsAttribute";
import { SkinFilterCollection } from "./Attribute/Skin/Filter/SkinFilterCollection";
import { StickerProductionContraintCollection } from "./Attribute/Sticker/Constraint/StickerProductionContraintCollection";
import { CutDirectionAttribute } from "./Attribute/Sticker/CutDirectionAttribute";
import { DeliveryAttribute } from "./Attribute/Sticker/DeliveryAttribute";
import { DeliverySheetHeightAttribute } from "./Attribute/Sticker/DeliverySheetHeightAttribute";
import { DeliverySheetInsidePaddingAttribute } from "./Attribute/Sticker/DeliverySheetInsidePaddingAttribute";
import { DeliverySheetOutsidePaddingAttribute } from "./Attribute/Sticker/DeliverySheetOutsidePaddingAttribute";
import { DeliverySheetWidthAttribute } from "./Attribute/Sticker/DeliverySheetWidthAttribute";
import { EpoxyTemplateAttribute } from "./Attribute/Sticker/EpoxyTemplateAttribute";
import { FeatureAttribute } from "./Attribute/Sticker/FeatureAttribute";
import { StickerWizardFilterCollection } from "./Attribute/Sticker/Filter/StickerWizardFilterCollection";
import { StickerAttributeIconCollection } from "./Attribute/Sticker/Icon/StickerAttributeIconCollection";
import { ImageFiltersAttribute } from "./Attribute/Sticker/ImageFiltersAttribute";
import { InkAttribute } from "./Attribute/Sticker/InkAttribute";
import { InnercutAsKisscutAttribute } from "./Attribute/Sticker/InnercutAsKisscutAttribute";
import { LaminateAttribute } from "./Attribute/Sticker/LaminateAttribute";
import { MaterialAttribute } from "./Attribute/Sticker/MaterialAttribute";
import { MaterialColorAttribute } from "./Attribute/Sticker/MaterialColorAttribute";
import { MaxSizeAttribute } from "./Attribute/Sticker/MaxSizeAttribute";
import { MaxSizeOtherSideAttribute } from "./Attribute/Sticker/MaxSizeOtherSideAttribute";
import { MinSizeAttribute } from "./Attribute/Sticker/MinSizeAttribute";
import { OutlineAttribute } from "./Attribute/Sticker/OutlineAttribute";
import { ProductionInstructionAttribute } from "./Attribute/Sticker/ProductionInstructionAttribute";
import { ProductionLineAttribute } from "./Attribute/Sticker/ProductionLineAttribute";
import { SheetTypeAttribute } from "./Attribute/Sticker/SheetTypeAttribute";
import { SizeAttribute } from "./Attribute/Sticker/SizeAttribute";
import { StickerSheetNameAttribute } from "./Attribute/Sticker/StickerSheetNameAttribute";
import { StickerWizardStockCollection } from "./Attribute/Sticker/Stock/StickerWizardStockCollection";
import { WhiteLayerAttribute } from "./Attribute/Sticker/WhiteLayerAttribute";
import { TemplateAttribute } from "./Attribute/TemplateAttribute";
import { WidthAttribute } from "./Attribute/WidthAttribute";
import { CustomStickerFamily } from "./Family/CustomStickerFamily";
import { FeeFamily } from "./Family/FeeFamily";
import { PhoneCaseProductFamily } from "./Family/PhoneCaseProductFamily";
import { PromoProductFamily } from "./Family/PromoProductFamily";
import { SkinProductFamily } from "./Family/SkinProductFamily";
import { PromoProductPriceProvider } from "./Price/PromoProductPriceProvider";
import { SkinPriceProvider } from "./Price/SkinPriceProvider";
import { StickerPriceProvider } from "./Price/StickerPriceProvider";
import { StickerQuantityListCollection } from "./Price/StickerQuantityListCollection";

export class StickerAppProductService extends ProductService {
	public constructor() {
		super();

		this.registerAttribute( new SheetTypeAttribute() );
		this.registerAttribute( new StickerSheetNameAttribute() );
		this.registerAttribute( new TemplateAttribute() );
		this.registerAttribute( new LaminateAttribute() );
		this.registerAttribute( new MaterialAttribute() );
		this.registerAttribute( new WidthAttribute() );
		this.registerAttribute( new HeightAttribute() );
		this.registerAttribute( new QuantityAttribute() );
		this.registerAttribute( new FeatureAttribute() );
		this.registerAttribute( new InkAttribute() );
		this.registerAttribute( new ProductionLineAttribute() );
		this.registerAttribute( new ProductionInstructionAttribute() );
		this.registerAttribute( new DeliveryAttribute() );
		this.registerAttribute( new DeliverySheetWidthAttribute() );
		this.registerAttribute( new DeliverySheetHeightAttribute() );
		this.registerAttribute( new DeliverySheetInsidePaddingAttribute() );
		this.registerAttribute( new DeliverySheetOutsidePaddingAttribute() );
		this.registerAttribute( new EpoxyTemplateAttribute() );
		this.registerAttribute( new CutDirectionAttribute() );
		this.registerAttribute( new WhiteLayerAttribute() );
		this.registerAttribute( new InnercutAsKisscutAttribute() );
		this.registerAttribute( new OutlineAttribute() );
		this.registerAttribute( new ImageFiltersAttribute() );
		this.registerAttribute( new ResellerAttribute() );
		this.registerAttribute( new SizeAttribute() );
		this.registerAttribute( new MinSizeAttribute() );
		this.registerAttribute( new MaxSizeAttribute() );
		this.registerAttribute( new MaxSizeOtherSideAttribute() );
		this.registerAttribute( new ImperialUnitsAttribute() );
		this.registerAttribute( new FixedSizeAttribute() );
		this.registerAttribute( new FixedQuantityAttribute() );
		this.registerAttribute( new SheetTypeSaveAsAttribute() );
		this.registerAttribute( new NoteAttribute() );
		this.registerAttribute( new PriceMarginPercentageAttribute() );
		this.registerAttribute( new ReorderAttribute() );
		this.registerAttribute( new ChangedAttribute() );
		this.registerAttribute( new FigureAttribute() );
		this.registerAttribute( new CaseMaterialAttr() );
		this.registerAttribute( new CaseSheetTypeAttr() );
		this.registerAttribute( new DynamicStringAttr() );
		this.registerAttribute( new MarketAttribute() );
		this.registerAttribute( new MaterialColorAttribute() );
		this.registerAttribute( new ColorSupportedAttribute() );
		this.registerAttribute( new DeliveryRollSizeMMAttribute() );
		this.registerAttribute( new DeliveryRollSizeTypeAttribute() );
		this.registerAttribute( new DeliveryRollItemMarginAttribute() );
		this.registerAttribute( new DeliveryRollTopEdgeMarginAttribute() );
		this.registerAttribute( new EffectLayerFileNameDataAttribute() );
		this.registerAttribute( new EffectLayerFileAppIdAttribute() );

		this.registerAttrConstraintCollection( new StickerProductionContraintCollection() );
		this.registerAttrFilterCollection( new StickerWizardFilterCollection() );
		this.registerAttrFilterCollection( new SkinFilterCollection() );
		this.registerAttrStockCollection( new StickerWizardStockCollection() );
		this.registerAttrIconCollection( new StickerAttributeIconCollection( this ) );
		this.registerQuantityListCollection( new StickerQuantityListCollection() );

		this.registerPriceProvider( new StickerPriceProvider() );
		this.registerPriceProvider( new SkinPriceProvider() );
		this.registerPriceProvider( new PromoProductPriceProvider() );

		this.registerProductFamily( new CustomStickerFamily( this ) );
		this.registerProductFamily( new PhoneCaseProductFamily( this ) );
		this.registerProductFamily( new SkinProductFamily( this ) );
		this.registerProductFamily( new PromoProductFamily( this ) );
		this.registerProductFamily( new FeeFamily( this ) );
	}
}
