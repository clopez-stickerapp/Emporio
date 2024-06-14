import { ProductAttrStock } from "$/product/attribute/Stock/ProductAttrStock";
import { ProductAttrStockCollection } from "$/product/attribute/Stock/ProductAttrStockCollection";
import { FeatureAttribute } from "../FeatureAttribute";
import { InkAttribute } from "../InkAttribute";
import { LaminateAttribute } from "../LaminateAttribute";
import { MaterialAttribute } from "../MaterialAttribute";

export class StickerWizardStockCollection extends ProductAttrStockCollection {
	public static readonly NAME = "sticker_wizard_stock";

	public constructor() {
		super( StickerWizardStockCollection.NAME );

		this.addStock( new ProductAttrStock( MaterialAttribute.ALIAS, MaterialAttribute.OUT_OF_STOCK ) );
		this.addStock( new ProductAttrStock( LaminateAttribute.ALIAS, LaminateAttribute.OUT_OF_STOCK ) );
		this.addStock( new ProductAttrStock( FeatureAttribute.ALIAS, FeatureAttribute.OUT_OF_STOCK ) );
		this.addStock( new ProductAttrStock( InkAttribute.ALIAS, InkAttribute.OUT_OF_STOCK ) );
	}
}
