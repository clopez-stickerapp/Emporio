import { ProductAttrStock } from "$/product/attribute/Stock/ProductAttrStock";
import { ProductAttrStockCollection } from "$/product/attribute/Stock/ProductAttrStockCollection";
import { FeatureAttribute, ProductFeaturesOOS } from "./attributes/FeatureAttribute";
import { InkAttribute, InkOOS } from "./attributes/InkAttribute";
import { LaminateAttribute, LaminatesOOS } from "./attributes/LaminateAttribute";
import { MaterialAttribute, MaterialsOOS } from "./attributes/MaterialAttribute";

export class StickerWizardStockCollection extends ProductAttrStockCollection {
	public static readonly NAME = "sticker_wizard_stock";

	public constructor() {
		super( StickerWizardStockCollection.NAME );

		this.addStock( new ProductAttrStock( MaterialAttribute.getName(), MaterialsOOS ) );
		this.addStock( new ProductAttrStock( LaminateAttribute.getName(), LaminatesOOS ) );
		this.addStock( new ProductAttrStock( FeatureAttribute.getName(), ProductFeaturesOOS ) );
		this.addStock( new ProductAttrStock( InkAttribute.getName(), InkOOS ) );
	}
}
